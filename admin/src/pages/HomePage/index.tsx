/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';

import { Select, Option } from '@strapi/design-system/Select';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { faker } from '@faker-js/faker';
import { DatePicker } from '@strapi/design-system/DatePicker';
import {
	HeaderLayout,
	ContentLayout,
	Layout,
} from '@strapi/design-system/Layout';

import { Flex } from '@strapi/design-system/Flex';
import { Button } from '@strapi/design-system/Button';
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { Alert } from '@strapi/design-system/Alert';
import GeneratedDataTable from '../../components/GeneratedDataTable';
import axios from '../../utils/axiosInstance';

interface ContentType {
	apiID: string;
	uid: string;
	schema: {
		attributes: { [key: string]: { type: string } };
		draftAndPublish: boolean;
	};
}

const COUNT_PAGINATION_ROWS = 25;
const COUNT_UPLOADED_DATA_ONCE = 25;

const includeTypes = ['integer', 'string', 'richtext', 'email', 'date'];

const HomePage: React.VoidFunctionComponent = () => {
	const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
	const [isUploadingData, setIsUploadingData] = useState<boolean>(false);
	const [isPublished, setIsPublished] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [selectedTypeUID, setSelectedTypeUID] = useState<string | null>(null);
	const [values, setValues] = useState<{
		[key: string]:
			| { count: number }
			| { min: number; max: number }
			| { from: Date; to: Date };
	} | null>(null);
	const [count, setCount] = useState<number>(10);
	const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);
	const [generatedData, setGeneratedData] = useState<
		{ [key: string]: any }[]
	>([]);
	const [isFlushedPreviousData, setIsFlashedPreviousData] =
		useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const {
				data: { data },
			} = await axios.get('/content-type-builder/content-types');
			setContentTypes(data.filter((item) => item.uid.startsWith('api')));
		})();
	}, []);

	const selectedType = contentTypes.find(
		(item) => item.uid === selectedTypeUID
	) as unknown as ContentType;

	let draftAndPublish = selectedType?.schema.draftAndPublish || false;

	const attributes = selectedType
		? Object.keys(selectedType.schema.attributes).reduce((prev, key) => {
				return includeTypes.includes(
					selectedType.schema.attributes[key].type
				)
					? {
							...prev,
							[key]: selectedType.schema.attributes[key],
					  }
					: prev;
		  }, {})
		: null;

	useEffect(() => {
		if (attributes && !values) {
			let obj = {};
			let newCheckedAttributes: string[] = [];
			Object.keys(attributes).forEach((key) => {
				if (attributes[key].type === 'integer') {
					obj[key] = {
						min: attributes[key].min || 0,
						max: attributes[key].max || 10,
					};
				}
				if (
					attributes[key].type === 'string' ||
					'richtext' === attributes[key].type
				) {
					obj[key] = { count: 10 };
				}
				if (attributes[key].type === 'email') {
					obj[key] = {};
				}
				if (attributes[key].type === 'date') {
					obj[key] = { from: new Date(), to: new Date() };
				}
				newCheckedAttributes.push(key);
			});
			setCheckedAttributes(newCheckedAttributes);
			setValues(obj);
		}
	}, [attributes, values]);

	const handleChangeSelect = (newTypeUID: string) => {
		setValues(null);
		setSelectedTypeUID(newTypeUID);
	};

	const handleClickGenerate = () => {
		let data = [];
		if (attributes && values) {
			for (let i = 0; i < count; i++) {
				let obj = {};
				Object.keys(attributes)
					.filter((key) => checkedAttributes.includes(key))
					.forEach((key) => {
						if (attributes[key].type === 'integer') {
							let { min, max } = values[key] as {
								min: number;
								max: number;
							};
							obj[key] = faker.datatype.number({ min, max });
						} else if (
							attributes[key].type === 'string' ||
							'richtext' === attributes[key].type
						) {
							let { count } = values[key] as { count: number };
							obj[key] = faker.random.words(count);
						} else if (attributes[key].type === 'email') {
							obj[key] = faker.internet.email();
						} else if (attributes[key].type === 'date') {
							let { from, to } = values[key] as {
								from: Date;
								to: Date;
							};
							obj[key] = faker.date.between(from, to);
						}
					});
				// @ts-ignore
				data.push(obj);
			}
		}
		setGeneratedData(data);
	};

	const handleValueChange =
		(key: string, field: string) => (value: number | Date) => {
			const { min, max, from, to } = attributes[key];
			if (min || max) {
				let { min: currentMin, max: currentMax } = values[key] as {
					min: number;
					max: number;
				};
				if (
					value < min ||
					value > max ||
					(field === 'min' && value > currentMax) ||
					(field === 'max' && value < currentMin)
				) {
					return;
				}
			}
			if (field === 'from' || field === 'to') {
				let { from, to } = values[key] as {
					from: Date;
					to: Date;
				};

				if (
					(field === 'from' && value > to) ||
					(field === 'to' && value < from)
				) {
					return;
				}
			}
			if (value > 0) {
				// @ts-ignore
				setValues({
					...values,
					[key]: { ...values[key], [field]: value },
				});
			}
		};

	const handleChangeChecked = (key: string) => () => {
		if (checkedAttributes.includes(key)) {
			setCheckedAttributes(
				checkedAttributes.filter((item) => item !== key)
			);
		} else {
			setCheckedAttributes([...checkedAttributes, key]);
		}
	};

	const handleChangeIsFlushedPreviousData = () => {
		setIsFlashedPreviousData(!isFlushedPreviousData);
	};

	const handleUploadData = async () => {
		setIsUploadingData(true);
		setShowAlert(false);

		if (selectedType) {
			try {
				if (isFlushedPreviousData) {
					await axios.post(
						`/generate-data/flush/${selectedType.uid}`
					);
				}
				let uploadData = async (data) => {
					if (!data.length) {
						return;
					}
					let dataByCount = data.slice(0, COUNT_UPLOADED_DATA_ONCE);
					const response = await Promise.all(
						dataByCount.map((item) =>
							axios.post(
								`/content-manager/collection-types/${selectedType.uid}`,
								item
							)
						)
					);

					if (isPublished) {
						await Promise.all(
							response.map((item) =>
								axios.post(
									`/content-manager/collection-types/${selectedType.uid}/${item.data.id}/actions/publish`
								)
							)
						);
					}
					return uploadData(data.slice(COUNT_UPLOADED_DATA_ONCE));
				};
				await uploadData(generatedData);
			} catch (err) {}
		}
		setIsUploadingData(false);
		setShowAlert(true);
	};

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	const handleChangeIsPublished = () => {
		setIsPublished(!isPublished);
	};

	let renderStringInput = (key: string, attribute) => (
		<Flex gap='10px' alignItems='center'>
			<Checkbox
				disabled={attribute.required}
				onChange={handleChangeChecked(key)}
				checked={checkedAttributes.includes(key)}></Checkbox>
			<Typography variant='beta'>{key}</Typography>
			<NumberInput
				disabled={!checkedAttributes.includes(key)}
				onValueChange={handleValueChange(key, 'count')}
				// @ts-ignore
				value={values[key].count}
				label='Count words'></NumberInput>
		</Flex>
	);

	const getAttributeInputs = (key: string, attribute) => {
		return {
			['integer']: (
				<Flex gap='10px'>
					<Checkbox
						disabled={attribute.required}
						onChange={handleChangeChecked(key)}
						checked={checkedAttributes.includes(key)}></Checkbox>
					<Typography variant='beta'>{key}</Typography>
					<NumberInput
						disabled={!checkedAttributes.includes(key)}
						onValueChange={handleValueChange(key, 'min')}
						// @ts-ignore
						value={values[key].min}
						label={'min ' + attribute.min}></NumberInput>
					<NumberInput
						disabled={!checkedAttributes.includes(key)}
						onValueChange={handleValueChange(key, 'max')}
						// @ts-ignore
						value={values[key].max}
						label={'max ' + attribute.max}></NumberInput>
				</Flex>
			),
			['richtext']: renderStringInput(key, attribute),
			['string']: renderStringInput(key, attribute),
			['email']: (
				<Flex gap='10px'>
					<Checkbox
						disabled={attribute.required}
						onChange={handleChangeChecked(key)}
						checked={checkedAttributes.includes(key)}></Checkbox>
					<Typography variant='beta'>{key}</Typography>
				</Flex>
			),
			['date']: (
				<Flex gap='10px'>
					<Checkbox
						disabled={attribute.required}
						onChange={handleChangeChecked(key)}
						checked={checkedAttributes.includes(key)}></Checkbox>
					<Typography variant='beta'>{key}</Typography>
					<DatePicker
						onChange={handleValueChange(key, 'from')}
						selectedDateLabel={(formattedDate) =>
							`Date picker, current is ${formattedDate}`
						}
						// @ts-ignore
						selectedDate={values[key].from}
						label='Date from'></DatePicker>
					<DatePicker
						label='Date to'
						onChange={handleValueChange(key, 'to')}
						selectedDateLabel={(formattedDate) =>
							`Date picker, current is ${formattedDate}`
						}
						// @ts-ignore
						selectedDate={values[key].to}></DatePicker>
				</Flex>
			),
		};
	};

	return (
		<Layout>
			<HeaderLayout
				title='Generate data'
				subtitle='Generate data for your content types'
				as='h1'
			/>
			<ContentLayout>
				<Box marginBottom='10px'>
					<Select
						placeholder='Select your content type'
						value={selectedTypeUID}
						onChange={handleChangeSelect}>
						{contentTypes.map((item) => (
							<Option key={item.uid} value={item.uid}>
								{item.apiID}
							</Option>
						))}
					</Select>
				</Box>
				{attributes &&
					values &&
					Object.keys(attributes).map(
						(key) =>
							getAttributeInputs(key, attributes[key])[
								attributes[key].type
							]
					)}
				{selectedType && (
					<Box paddingTop='10px' paddingBottom='10px'>
						<Flex alignItems='end' gap='20px'>
							<NumberInput
								value={count}
								onValueChange={setCount}
								label='Count'></NumberInput>
							<Button onClick={handleClickGenerate}>
								Generate
							</Button>
						</Flex>
					</Box>
				)}
				{!!generatedData.length && (
					<>
						<GeneratedDataTable
							data={generatedData}></GeneratedDataTable>
						<Flex
							alignItems='center'
							marginTop='20px'
							marginBottom='20px'
							gap='20px'>
							<Checkbox
								disabled={isUploadingData}
								checked={isFlushedPreviousData}
								onChange={handleChangeIsFlushedPreviousData}>
								Flush previous content type data before upload
							</Checkbox>
							{draftAndPublish && (
								<Checkbox
									onChange={handleChangeIsPublished}
									checked={isPublished}>
									Publish content?
								</Checkbox>
							)}
							<Button
								loading={isUploadingData}
								onClick={handleUploadData}>
								Upload data
							</Button>
						</Flex>
					</>
				)}
				{showAlert && selectedType && (
					<Alert
						variant='success'
						onClose={handleCloseAlert}
						closeLabel='Close alert'
						title='Uploaded Alert'>
						The data for <b>{selectedType.apiID}</b> was uploaded
					</Alert>
				)}
			</ContentLayout>
		</Layout>
	);
};

export default HomePage;
