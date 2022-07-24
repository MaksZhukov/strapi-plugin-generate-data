import React from 'react';
import RefreshIcon from '@strapi/icons/Refresh';
import { Button } from '@strapi/design-system/Button';
import { Values } from '../../pages/HomePage/types';
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
						} else if (attributes[key].type === 'media') {
							let { width, height, min, max } = values[key] as {
								width: number;
								height: number;
								min: number;
								max: number;
							};
							if (min && max) {
								obj[key] = new Array(
									faker.datatype.number({ min, max })
								)
									.fill(null)
									.map(() =>
										faker.image.image(width, height, true)
									);
							} else {
								obj[key] = [
									faker.image.image(width, height, true),
								];
							}
						}
					});
				// @ts-ignore
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
