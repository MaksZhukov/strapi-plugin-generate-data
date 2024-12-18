import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox, NumberInput, Flex } from '@strapi/design-system';
import { GeneralProps } from '../types';
import { Typography } from '@strapi/design-system';

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
	onChangeCheck
}: Props): ReactElement => (
	<Grid.Item col={6}>
		<Box marginBottom="8px">
			<Box marginBottom="12px">
				<Checkbox
					disabled={disabled}
					onCheckedChange={() => onChangeCheck(attributeKey)}
					checked={checked}
				>
					{`${attributeKey} (Field type: JSON)`}
				</Checkbox>
			</Box>
			<Flex gap="16px">
				<Box flex="1">
					<Typography>min fields</Typography>
					<NumberInput
						name=""
						disabled={!checked}
						onValueChange={onChangeValue(attributeKey, 'min')}
						value={values.min}
					></NumberInput>
				</Box>
				<Box flex="1">
					<Typography>max fields</Typography>
					<NumberInput
						name=""
						disabled={!checked}
						onValueChange={onChangeValue(attributeKey, 'max')}
						value={values.max}
					></NumberInput>
				</Box>
			</Flex>
		</Box>
	</Grid.Item>
);

export default JSONInput;
