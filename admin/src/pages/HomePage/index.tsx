import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	SingleSelect,
	SingleSelectOption,
	Box,
	Grid,
	Flex,
	NumberInput,
	Checkbox,
	Alert,
	Button
} from '@strapi/design-system';
import { ChevronDown, ChevronUp } from '@strapi/icons';
import GeneratedDataTable from '../../components/GeneratedDataTable';
import Upload from '../../components/Upload';
import Generate from '../../components/Generate';
import axios from '../../utils/axiosInstance';
import { getAttributeInputs } from './config';
import { Attribute, AttributeType, GeneratedData, Values } from './types';
import { Typography } from '@strapi/design-system';

interface ContentType {
	apiID: string;
	uid: string;
	schema: {
		attributes: { [key: string]: Attribute };
		draftAndPublish: boolean;
	};
}

const includeTypes = Object.values(AttributeType);

const COUNT_RELATION_DATA_PER_PAGE = 25;

const HomePage: React.FC = () => {
	const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
	const [isUploadingData, setIsUploadingData] = useState<boolean>(false);
	const [isPublished, setIsPublished] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [uploadedError, setUploadedError] = useState<boolean>(false);
	const [values, setValues] = useState<Values | null>(null);
	const [count, setCount] = useState<number>(10);
	const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);
	const [generatedData, setGeneratedData] = useState<GeneratedData[]>([]);
	const [isFlushedPreviousData, setIsFlashedPreviousData] = useState<boolean>(false);
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const { search } = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(search);
	const selectedTypeUID = query.get('typeUID') || null;

	useEffect(() => {
		(async () => {
			const {
				data: { data }
			} = await axios.get<{ data: ContentType[] }>('/generate-data/content-types');
			setContentTypes(data);
		})();
	}, []);

	const selectedType = contentTypes.find(
		(item) => item.uid === selectedTypeUID
	) as unknown as ContentType;

	let draftAndPublish = selectedType?.schema.draftAndPublish || false;

	const attributes = useMemo(
		(): { [key: string]: Attribute } | null =>
			selectedType
				? Object.keys(selectedType.schema.attributes).reduce((prev, key) => {
						return includeTypes.includes(selectedType.schema.attributes[key].type)
							? {
									...prev,
									[key]: selectedType.schema.attributes[key]
								}
							: prev;
					}, {})
				: null,
		[selectedType]
	);

	useEffect(() => {
		if (attributes && !values) {
			let obj: Values = {};
			let newCheckedAttributes: string[] = [];
			const stringTypes = [AttributeType.String, AttributeType.Text, AttributeType.Richtext];
			const createValues = async () => {
				await Promise.all(
					Object.keys(attributes).map(async (key) => {
						let type = attributes[key].type;
						if (
							[
								AttributeType.Integer,
								AttributeType.Decimal,
								AttributeType.JSON,
								...stringTypes
							].includes(type)
						) {
							obj[key] = {
								min: attributes[key].min || 1,
								max: attributes[key].max || 1,
								...(stringTypes.includes(type)
									? { minSymbols: 1, maxSymbols: 10 }
									: {})
							};
						}
						if (type === AttributeType.Date) {
							obj[key] = { from: new Date(), to: new Date() };
						}
						if (attributes[key].type === AttributeType.Media) {
							obj[key] = {
								width: 640,
								height: 480,
								...(attributes[key].multiple ? { min: 1, max: 3 } : {})
							};
						}
						if (type === AttributeType.Relation) {
							const { data } = await axios(
								`/generate-data/collection-types/${attributes[key].target}`
							);

							let pageCount = Math.ceil(
								data.meta.pagination.total / COUNT_RELATION_DATA_PER_PAGE
							);
							obj[key] = {
								pageCount
							};
							if (pageCount === 0) {
								return;
							}
						}
						if (
							[
								AttributeType.Email,
								AttributeType.Boolean,
								AttributeType.Enumeration,
								AttributeType.UID,
								AttributeType.Password
							].includes(type)
						) {
							obj[key] = {};
						}
						newCheckedAttributes.push(key);
					})
				);
				setCheckedAttributes(newCheckedAttributes);
				setValues(obj);
			};
			createValues();
		}
	}, [attributes, values]);

	const handleChangeSelect = (newTypeUID: string) => {
		const params = new URLSearchParams();
		params.append('typeUID', newTypeUID);
		navigate({ search: params.toString() });
		setValues(null);
		setGeneratedData([]);
		setShowAlert(false);
	};

	const handleChangeValue = (key: string, field: string) => (value: number | Date) => {
		if (attributes && values) {
			const { min, max } = attributes[key];
			if (min || max) {
				let { min: currentMin, max: currentMax } = values[key] as {
					min: number;
					max: number;
				};
				if (
					typeof value === 'number' &&
					(value < min ||
						value > max ||
						(field === 'min' && value > currentMax) ||
						(field === 'max' && value < currentMin))
				) {
					return;
				}
			}
			if (field === 'from' || field === 'to') {
				let { from, to } = values[key] as {
					from: Date;
					to: Date;
				};
				if ((field === 'from' && value > to) || (field === 'to' && value < from)) {
					return;
				}
			}
			if ((typeof value === 'number' && value > 0) || value instanceof Date) {
				setValues({
					...values,
					[key]: { ...values[key], [field]: value }
				});
			}
		}
	};

	const handleChangeCheck = (key: string) => {
		if (attributes) {
			if (checkedAttributes.includes(key)) {
				setCheckedAttributes(checkedAttributes.filter((item) => item !== key));
			} else {
				if (attributes[key].targetField) {
					if (checkedAttributes.includes(attributes[key].targetField)) {
						setCheckedAttributes([...checkedAttributes, key]);
					} else {
						setCheckedAttributes([
							...checkedAttributes,
							key,
							attributes[key].targetField
						]);
					}
				} else {
					setCheckedAttributes([...checkedAttributes, key]);
				}
			}
		}
	};

	const handleChangeIsFlushedPreviousData = () => {
		setIsFlashedPreviousData(!isFlushedPreviousData);
	};

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	const handleChangeIsPublished = () => {
		setIsPublished(!isPublished);
	};

	const handleChangeGenerateData = (data: GeneratedData[]): void => {
		setGeneratedData(data);
	};

	return (
		<Box padding="35px">
			<Box display="flex" marginBottom="10px" style={{ justifyContent: 'space-between' }}>
				<Box>
					<Typography fontSize="24px" fontWeight="bold" tag='div'>
						Generate data
					</Typography>
					<Typography>Generate data for your content types</Typography>
				</Box>
				{attributes && values && (
					<Generate
						attributes={attributes}
						checkedAttributes={checkedAttributes}
						count={count}
						onChangeGenerateData={handleChangeGenerateData}
						values={values}
					></Generate>
				)}
			</Box>
			<Box>
				<Box
					shadow="filterShadow"
					padding={6}
					borderRadius="4px"
					marginBottom="24px"
					background="neutral0"
				>
					<Flex
						justifyContent="space-between"
						alignItems="center"
						marginBottom={isCollapsed ? 0 : 4}
					>
						<Typography fontSize="16px" fontWeight="semiBold">
							Configuration
						</Typography>
						<Button
							variant="tertiary"
							size="S"
							onClick={() => setIsCollapsed(!isCollapsed)}
							startIcon={isCollapsed ? <ChevronDown /> : <ChevronUp />}
						>
							{isCollapsed ? 'Expand' : 'Collapse'}
						</Button>
					</Flex>
					{!isCollapsed && (
						<>
							<Flex gap="16px">
								<Box flex="1" marginBottom="24px">
									<SingleSelect
										placeholder="Select your content type"
										value={selectedTypeUID}
										onChange={(value) => handleChangeSelect(value.toString())}
									>
										{contentTypes.map((item) => (
											<SingleSelectOption key={item.uid} value={item.uid}>
												{item.apiID}
											</SingleSelectOption>
										))}
									</SingleSelect>
								</Box>
								<Box flex="1"></Box>
							</Flex>
							<Grid.Root gap={4}>
								{attributes &&
									values &&
									Object.keys(attributes).map((key) => (
										<React.Fragment key={key}>
											{
												getAttributeInputs({
													key,
													attributes,
													attribute: attributes[key],
													values,
													checkedAttributes,
													onChangeCheck: handleChangeCheck,
													onChangeValue: handleChangeValue
												})[attributes[key].type]
											}
										</React.Fragment>
									))}
							</Grid.Root>
							{attributes && (
								<Flex gap="16px">
									<Box paddingTop={4} flex="1">
										<Typography>Count items to generate</Typography>
										<NumberInput
											value={count}
											name=""
											onValueChange={(value) => setCount(value || 1)}
										></NumberInput>
									</Box>{' '}
									<Box flex="1"></Box>
								</Flex>
							)}
						</>
					)}
				</Box>
				{!!generatedData.length &&
					Object.keys(generatedData[0]).length >= checkedAttributes.length && (
						<>
							<GeneratedDataTable
								attributes={attributes}
								data={generatedData}
								checkedAttributes={checkedAttributes}
							></GeneratedDataTable>
							<Flex
								alignItems="center"
								marginTop="12px"
								marginBottom="12px"
								gap="32px"
							>
								<Checkbox
									disabled={isUploadingData}
									checked={isFlushedPreviousData}
									onCheckedChange={handleChangeIsFlushedPreviousData}
								>
									Flush previous content type data before upload
								</Checkbox>
								{draftAndPublish && (
									<Checkbox
										onCheckedChange={handleChangeIsPublished}
										checked={isPublished}
									>
										Publish content?
									</Checkbox>
								)}
								<Upload
									attributes={attributes}
									selectedType={selectedType}
									generatedData={generatedData}
									isFlushedPreviousData={isFlushedPreviousData}
									isPublished={isPublished}
									checkedAttributes={checkedAttributes}
									isUploadingData={isUploadingData}
									onChangeUploadedError={setUploadedError}
									onChangeIsUploadingData={setIsUploadingData}
									onChangeShowAlert={setShowAlert}
								></Upload>
							</Flex>
						</>
					)}
				{!!generatedData.length &&
					Object.keys(generatedData[0]).length < checkedAttributes.length && (
						<Alert closeLabel="Close alert">
							Regenerate data with new added attributes
						</Alert>
					)}
				{showAlert && selectedType && (
					<Alert
						variant={uploadedError ? 'danger' : 'success'}
						onClose={handleCloseAlert}
						closeLabel="Close alert"
						title="Uploaded Alert"
					>
						The data for <b>{selectedType.apiID}</b>
						{uploadedError ? " wasn't" : ' was'} uploaded
					</Alert>
				)}
			</Box>
		</Box>
	);
};

export default HomePage;
