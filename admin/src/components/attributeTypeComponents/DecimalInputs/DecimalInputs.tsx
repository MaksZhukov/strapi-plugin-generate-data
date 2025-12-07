import React from 'react';
import { Box, Grid, Flex, Checkbox, NumberInput } from '@strapi/design-system';
import { GeneralProps } from '../types';
import { Typography } from '@strapi/design-system';

interface Props extends GeneralProps {
	values: { min: number; max: number };
	onChangeValue: (key: string, field: string) => (value: number) => void;
}

const DecimalInputs = ({
	onChangeCheck,
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
	values,
	onChangeValue
}: Props) => {
	return (
		<Grid.Item col={12}>
			<Box marginBottom="8px">
				<Box marginBottom="12px">
					<Checkbox
						onCheckedChange={() => onChangeCheck(attributeKey)}
						disabled={disabled}
						checked={checked}
					>
						{`${attributeKey} (Field type: Decimal)`}
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
						<Typography>max {attribute.min ? attribute.min : ''}</Typography>
						<NumberInput
							name=""
							disabled={!checked}
							onValueChange={(value) =>
								onChangeValue(attributeKey, 'min')(value || 1)
							}
							value={values.min}
						></NumberInput>
					</Box>
					<Box flex="1">
						<Typography>max {attribute.max ? attribute.max : ''}</Typography>
						<NumberInput
							name=""
							disabled={!checked}
							onValueChange={(value) =>
								onChangeValue(attributeKey, 'max')(value || 1)
							}
							value={values.max}
						></NumberInput>
					</Box>
				</Flex>
			</Box>
		</Grid.Item>
	);
};

export default DecimalInputs;
