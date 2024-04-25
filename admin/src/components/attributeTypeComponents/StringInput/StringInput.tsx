import React from 'react';
import { Box, GridItem, Flex, NumberInput, Checkbox } from '@strapi/design-system';
import { GeneralProps } from '../types';
import { AttributeType } from '../../../pages/HomePage/types';

interface Props extends GeneralProps {
	values: { min: number; max: number; minSymbols: number; maxSymbols: number };
	onChangeValue: (key: string, field: string) => void;
}

const StringInput = ({ attribute, attributeKey, checked, disabled, values, onChangeCheck, onChangeValue }: Props) => {
	return (
		<GridItem col={6}>
			<Box marginBottom='8px'>
				<Box marginBottom='12px'>
					<Checkbox disabled={disabled} onChange={() => onChangeCheck(attributeKey)} checked={checked}>
						{`${attributeKey} (Field type: ${
							attribute.type === AttributeType.String || attribute.type == AttributeType.Text
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
							onValueChange={() => onChangeValue(attributeKey, 'min')}
							value={values.min}
							label={`min count words`}></NumberInput>
					</Box>
					<Box flex='1'>
						<NumberInput
							name=''
							disabled={!checked}
							onValueChange={() => onChangeValue(attributeKey, 'max')}
							value={values.max}
							label={`max count words`}></NumberInput>
					</Box>
					<Box flex='1'>
						<NumberInput
							name=''
							disabled={!checked}
							onValueChange={() => onChangeValue(attributeKey, 'minSymbols')}
							value={values.minSymbols}
							label={`min count symbols`}></NumberInput>
					</Box>
					<Box flex='1'>
						<NumberInput
							name=''
							disabled={!checked}
							onValueChange={() => onChangeValue(attributeKey, 'maxSymbols')}
							value={values.maxSymbols}
							label={`max count symbols`}></NumberInput>
					</Box>
				</Flex>
			</Box>
		</GridItem>
	);
};

export default StringInput;
