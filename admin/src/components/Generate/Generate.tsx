import React from 'react';
import RefreshIcon from '@strapi/icons/Refresh';
import { Button } from '@strapi/design-system/Button';
import { AttributeType, Values } from '../../pages/HomePage/types';
import { faker } from '@faker-js/faker';

interface Props {
	attributes: any;
	checkedAttributes: string[];
	values: Values;
	count: number;
	onChangeGenerateData: (data: any[]) => void;
}

const Generate = ({
	attributes,
	checkedAttributes,
	values,
	count,
	onChangeGenerateData,
}: Props) => {
	console.log(attributes);
	const getValueByIntegerType = (key: string): number => {
		let { min, max } = values[key] as {
			min: number;
			max: number;
		};
		return faker.datatype.number({ min, max });
	};

	const getValueByStringAndRichtextType = (key: string): string => {
		let { count } = values[key] as { count: number };
		return faker.random.words(count);
	};
	const getValueByEmailType = (): string => {
		return faker.internet.email();
	};
	const getValueByDateType = (key: string): Date => {
		let { from, to } = values[key] as {
			from: Date;
			to: Date;
		};
		return faker.date.between(from, to);
	};

	const getValueByMediaType = (key: string): string[] => {
		let value = [];
		let { width, height, min, max } = values[key] as {
			width: number;
			height: number;
			min: number;
			max: number;
		};
		if (min && max) {
			value.push(
				...new Array(faker.datatype.number({ min, max }))
					.fill(null)
					.map(() => faker.image.image(width, height, true))
			);
		} else {
			value.push(faker.image.image(width, height, true));
		}
		return value;
	};

	const getValueBooleanType = (): boolean => {
		return faker.datatype.boolean();
	};

	const getValueByEnumerationType = (key: string): string => {
		const enumValues = attributes[key].enum;
		let randomIndex = faker.datatype.number({
			min: 0,
			max: enumValues.length - 1,
		});
		return enumValues[randomIndex];
	};

	const getGeneratedDataByType = (type: AttributeType, key: string): any => {
		let obj = {
			[AttributeType.Integer]: getValueByIntegerType,
			[AttributeType.String]: getValueByStringAndRichtextType,
			[AttributeType.Richtext]: getValueByStringAndRichtextType,
			[AttributeType.Email]: getValueByEmailType,
			[AttributeType.Date]: getValueByDateType,
			[AttributeType.Media]: getValueByMediaType,
			[AttributeType.Boolean]: getValueBooleanType,
			[AttributeType.Enumeration]: getValueByEnumerationType,
		};
		return obj[type](key);
	};
	const handleClickGenerate = () => {
		let data = [];
		if (attributes && values) {
			for (let i = 0; i < count; i++) {
				let obj = {};
				Object.keys(attributes)
					.filter((key) => checkedAttributes.includes(key))
					.forEach((key) => {
						obj[key] = getGeneratedDataByType(
							attributes[key].type,
							key
						);
					});
				data.push(obj);
			}
		}
		onChangeGenerateData(data);
	};
	return (
		<Button
			startIcon={<RefreshIcon></RefreshIcon>}
			onClick={handleClickGenerate}>
			Generate
		</Button>
	);
};

export default Generate;
