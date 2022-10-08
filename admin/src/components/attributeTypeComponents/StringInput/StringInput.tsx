import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Flex } from '@strapi/design-system/Flex';
import { Button } from '@strapi/design-system/Button';
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { GeneralProps } from '../types';
import { AttributeType } from '../../../pages/HomePage/types';

interface Props extends GeneralProps {
	values: { count: number };
	onChangeValue: (key: string, field: string) => void;
}

const StringInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	values,
	onChangeCheck,
	onChangeValue,
}: Props) => {
	return (
		<GridItem col={6}>
			<Box marginBottom='8px'>
				<Box marginBottom='12px'>
					<Checkbox
						disabled={disabled}
						onChange={onChangeCheck(attributeKey)}
						checked={checked}>
						{`${attributeKey} (Field type: ${
							attribute.type === AttributeType.String ||
              						attribute.type == AttributeType.Text
								? 'String'
								: 'Richtext'
						})`}
					</Checkbox>
				</Box>
				<Flex gap='16px'>
					<Box flex='1'>
						<NumberInput
							name=''
							disabled={!checked}
							onValueChange={onChangeValue(attributeKey, 'min')}
							// @ts-ignore
							value={values.min}
							label={`min count words`}></NumberInput>
					</Box>
					<Box flex='1'>
						<NumberInput
							name=''
							disabled={!checked}
							onValueChange={onChangeValue(attributeKey, 'max')}
							// @ts-ignore
							value={values.max}
							label={`max count words`}></NumberInput>
					</Box>
				</Flex>
			</Box>
		</GridItem>
	);
};

export default StringInput;
