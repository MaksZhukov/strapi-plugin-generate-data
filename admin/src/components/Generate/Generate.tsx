import { faker } from '@faker-js/faker';
import { Button } from '@strapi/design-system';
import { Refresh as RefreshIcon } from '@strapi/icons';
import qs from 'qs';
import React from 'react';
import slugify from 'slugify';
import { Attribute, AttributeType, Values } from '../../pages/HomePage/types';
import axios from '../../utils/axiosInstance';

const COUNT_VIDEOS = 10;
const COUNT_AUDIOS = 5;
const COUNT_FILES = 5;
interface Props {
	attributes: { [key: string]: Attribute };
	checkedAttributes: string[];
	values: Values;
	count: number;
	onChangeGenerateData: (data: any[]) => void;
}

const Generate = ({ attributes, checkedAttributes, values, count, onChangeGenerateData }: Props) => {
	const capitalizeFirstLetter = (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const getValueByIntegerType = (key: string): number => {
		let { min, max } = values[key] as {
			min: number;
			max: number;
		};
		return faker.number.int({ min, max });
	};

	const getValueByDecimalType = (key: string): number => {
		let { min, max } = values[key] as {
			min: number;
			max: number;
		};
		return faker.datatype.float({ min, max });
	};

	const getValueByStringAndRichtextType = (key: string, relationArray: number[], regex?: string): string => {
		if (regex) {
			return faker.helpers.fromRegExp(regex);
		}
		let { min, max, minSymbols, maxSymbols } = values[key] as {
			min: number;
			max: number;
			minSymbols: number;
			maxSymbols: number;
		};

		if (!min && !max) return faker.lorem.words();
		if (min === 1 && max === 1)
			return capitalizeFirstLetter(faker.lorem.word({ length: { max: maxSymbols, min: minSymbols } }));
		return faker.lorem
			.words({ min, max })
			.split(' ')
			.map((item) => {
				let randomIndex = faker.number.int({
					min: 1,
					max: maxSymbols
				});
				return item.slice(0, randomIndex);
			})
			.join(' ');
	};
	const getValueByEmailType = (): string => {
		return faker.internet.email().toLowerCase();
	};
	const getValueByDateType = (key: string): Date => {
		let { from, to } = values[key] as {
			from: Date;
			to: Date;
		};
		return faker.date.between(from, to);
	};

	const getValueByMediaTypeImages = (arrValues: null[], width: number, height: number) =>
		arrValues.map(() => faker.image.image(width, height, true));

	const getValueByMediaTypeVideos = (arrValues: null[]) =>
		arrValues.map(
			() =>
				(axios.defaults.baseURL || location.origin) +
				`/generate-data/videos/${faker.number.int({
					min: 1,
					max: COUNT_VIDEOS
				})}.mp4`
		);

	const getValueByMediaTypeAudios = (arrValues: null[]) =>
		arrValues.map(
			() =>
				(axios.defaults.baseURL || location.origin) +
				`/generate-data/audios/${faker.number.int({
					min: 1,
					max: COUNT_AUDIOS
				})}.wav`
		);

	const getValueByMediaTypeFiles = (arrValues: null[]) =>
		arrValues.map(
			() =>
				(axios.defaults.baseURL || location.origin) +
				`/generate-data/audios/${faker.number.int({
					min: 1,
					max: COUNT_FILES
				})}.json`
		);

	const getValueByMediaType = (key: string): string[] => {
		let attribute = attributes[key];
		let allowedType =
			attribute.allowedTypes[
				faker.number.int({
					min: 0,
					max: attribute.allowedTypes.length - 1
				})
			];

		let value: string[] = [];
		let { width, height, min, max } = values[key] as {
			width: number;
			height: number;
			min: number;
			max: number;
		};
		let multiple = min && max;
		let arrValues: null[] = new Array(multiple ? faker.number.int({ min, max }) : 1).fill(null);

		let getValues = {
			images: getValueByMediaTypeImages(arrValues, width, height),
			videos: getValueByMediaTypeVideos(arrValues),
			audios: getValueByMediaTypeAudios(arrValues),
			files: getValueByMediaTypeFiles(arrValues)
		};

		value.push(...getValues[allowedType]);

		return value;
	};

	const getValueByBooleanType = (): boolean => {
		return faker.datatype.boolean();
	};

	const getValueByEnumerationType = (key: string): string => {
		const enumValues = attributes[key].enum;
		let randomIndex = faker.number.int({
			min: 0,
			max: enumValues.length - 1
		});
		return enumValues[randomIndex];
	};

	const getValueByPasswordType = (): string => {
		return faker.internet.password();
	};

	const getValueByUIDType = (): string => {
		return faker.string.uuid();
	};

	const getValueByRelationType = (key: string, relationArray: number[]): number => {
		return relationArray[faker.number.int({ min: 0, max: relationArray.length - 1 })];
	};

	const getValueByJSONType = (key) => {
		let { min, max } = values[key] as {
			min: number;
			max: number;
		};
		let countFields = faker.number.int({ min, max });
		return new Array(countFields).fill(null).reduce(
			(accum) => ({
				...accum,
				[faker.random.word()]: faker.random.word()
			}),
			{}
		);
	};

	const getGeneratedDataByType = (
		type: AttributeType,
		key: string,
		relationArray: { [key: string]: number[] },
		regex?: string
	): any => {
		let obj = {
			[AttributeType.Integer]: getValueByIntegerType,
			[AttributeType.String]: getValueByStringAndRichtextType,
			[AttributeType.Text]: getValueByStringAndRichtextType,
			[AttributeType.Richtext]: getValueByStringAndRichtextType,
			[AttributeType.Email]: getValueByEmailType,
			[AttributeType.Date]: getValueByDateType,
			[AttributeType.Media]: getValueByMediaType,
			[AttributeType.Boolean]: getValueByBooleanType,
			[AttributeType.Enumeration]: getValueByEnumerationType,
			[AttributeType.Password]: getValueByPasswordType,
			[AttributeType.UID]: getValueByUIDType,
			[AttributeType.Decimal]: getValueByDecimalType,
			[AttributeType.Relation]: getValueByRelationType,
			[AttributeType.JSON]: getValueByJSONType
		};

		return obj[type](key, relationArray[key], regex);
	};

	const handleClickGenerate = async () => {
		let data: { [key: string]: string | string[] }[] = [];
		if (attributes && values) {
			let relationData = {};
			const relationKeys = Object.keys(attributes)
				.filter((key) => checkedAttributes.includes(key))
				.filter((key) => attributes[key].type === AttributeType.Relation);

			await Promise.all(
				relationKeys.map(async (key) => {
					const res = await axios(
						`/content-manager/collection-types/${attributes[key].target}?${qs.stringify(
							{
								fields: ['id'],
								page: faker.number.int({
									min: 1,
									max: 1
								})
							},
							{ encodeValuesOnly: true }
						)}`
					);
					relationData[key] = res.data.results.map((item) => item.id);
				})
			);

			for (let i = 0; i < count; i++) {
				let obj: { [key: string]: string | string[] } = {};
				let UIDsWithTargetField: [string, Attribute][] = [];
				Object.keys(attributes)
					.filter((key) => checkedAttributes.includes(key))
					.forEach((key) => {
						if (attributes[key].type === AttributeType.UID && attributes[key].targetField) {
							UIDsWithTargetField.push([key, attributes[key]]);
						}

						if (
							(attributes[key].type === AttributeType.String ||
								AttributeType.Text ||
								AttributeType.Richtext) &&
							attributes[key].regex
						) {
							obj[key] = getGeneratedDataByType(
								attributes[key].type,
								key,
								relationData,
								attributes[key].regex
							);
						} else {
							obj[key] = getGeneratedDataByType(attributes[key].type, key, relationData);
						}
					});
				UIDsWithTargetField.forEach(([key, attr]) => {
					let field = obj[attr.targetField];
					if (typeof field === 'string') {
						obj[key] = slugify(field, '-') + '-' + obj[key];
					}
				});
				data.push(obj);
			}
		}
		onChangeGenerateData(data);
	};
	return (
		<Button startIcon={<RefreshIcon></RefreshIcon>} onClick={handleClickGenerate}>
			Generate
		</Button>
	);
};

export default Generate;
