import React from 'react';
import { DatePicker } from '@strapi/design-system/DatePicker';
import { Box } from '@strapi/design-system/Box';
import { GridItem } from '@strapi/design-system/Grid';
import { Flex } from '@strapi/design-system/Flex';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { GeneralProps } from '../types';

interface Props extends GeneralProps {
	values: { to: Date; from: Date };
	onChangeValue: (key: string, field: string) => void;
}

const DateInputs = ({
	attribute,
	attributeKey,
	checked,
	onChangeValue,
	onChangeCheck,
}: Props) => {
	return (
		<GridItem col={12}>
			<Box marginBottom='8px'>
				<Box marginBottom='12px'>
					<Checkbox
						disabled={attribute.required}
						onChange={onChangeCheck(attributeKey)}
						checked={checked}>
						{attributeKey}
					</Checkbox>
				</Box>
				<Flex gap='16px'>
					<Box flex='1'>
						<DatePicker
							onChange={onChangeValue(attributeKey, 'from')}
							selectedDateLabel={(formattedDate) =>
								`Date picker, current is ${formattedDate}`
							}
							// @ts-ignore
							selectedDate={values.from}
							label='Date from'></DatePicker>
					</Box>
					<Box flex='1'>
						<DatePicker
							label='Date to'
							onChange={onChangeValue(attributeKey, 'to')}
							selectedDateLabel={(formattedDate) =>
								`Date picker, current is ${formattedDate}`
							}
							// @ts-ignore
							selectedDate={values.to}></DatePicker>
					</Box>
				</Flex>
			</Box>
		</GridItem>
	);
};

export default DateInputs;
