import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox, NumberInput, Flex } from '@strapi/design-system';
import { GeneralProps } from '../types';
import { Typography } from '@strapi/design-system';

interface Props extends GeneralProps {
	values: { min: number; max: number };
	onChangeValue: (key: string, field: string) => (value: number) => void;
}

const JSONInput = ({
	attribute,
	values,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
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
					{required && (
						<>
							; <strong>Required</strong>
						</>
					)}
					{unique && (
						<>
							; <strong>Unique</strong>
						</>
					)}
				</Checkbox>
			</Box>
			<Flex gap="16px">
				<Box flex="1">
					<Typography>min fields</Typography>
					<NumberInput
						name=""
						disabled={!checked}
						onValueChange={(value) => onChangeValue(attributeKey, 'min')(value || 1)}
						value={values.min}
					></NumberInput>
				</Box>
				<Box flex="1">
					<Typography>max fields</Typography>
					<NumberInput
						name=""
						disabled={!checked}
						onValueChange={(value) => onChangeValue(attributeKey, 'max')(value || 1)}
						value={values.max}
					></NumberInput>
				</Box>
			</Flex>
		</Box>
	</Grid.Item>
);

export default JSONInput;
