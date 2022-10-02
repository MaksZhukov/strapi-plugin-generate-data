import React, { ReactElement } from 'react';
import { Box } from '@strapi/design-system/Box';
import { GridItem } from '@strapi/design-system/Grid';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Flex } from '@strapi/design-system/Flex';
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
				onChange={onChangeCheck(attributeKey)}
				checked={checked}>
				{`${attributeKey} (Field type: JSON)`}
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
					label={`min fields`}></NumberInput>
			</Box>
			<Box flex='1'>
				<NumberInput
					name=''
					disabled={!checked}
					onValueChange={onChangeValue(attributeKey, 'max')}
					// @ts-ignore
					value={values.max}
					label={`max fields`}></NumberInput>
			</Box>
		</Flex>
	</GridItem>
);

export default JSONInput;
