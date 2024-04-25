import React, { ReactElement } from 'react';
import { Box, GridItem, Checkbox, NumberInput, Flex } from '@strapi/design-system';
import { GeneralProps } from '../types';

interface Props extends GeneralProps {
	values: { min: number; max: number };
	onChangeValue: (key: string, field: string) => void;
}

const JSONInput = ({
	attribute,
	values,
	attributeKey,
	checked,
	disabled,
	onChangeValue,
	onChangeCheck,
}: Props): ReactElement => (
	<GridItem col={6}>
		<Box marginBottom='8px'>
			<Checkbox
				disabled={disabled}
				onChange={() => onChangeCheck(attributeKey)}
				checked={checked}>
				{`${attributeKey} (Field type: JSON)`}
			</Checkbox>
		</Box>
		<Flex gap='16px'>
			<Box flex='1'>
				<NumberInput
					name=''
					disabled={!checked}
					onValueChange={() => onChangeValue(attributeKey, 'min')}
					value={values.min}
					label={`min fields`}></NumberInput>
			</Box>
			<Box flex='1'>
				<NumberInput
					name=''
					disabled={!checked}
					onValueChange={() => onChangeValue(attributeKey, 'max')}
					value={values.max}
					label={`max fields`}></NumberInput>
			</Box>
		</Flex>
	</GridItem>
);

export default JSONInput;
