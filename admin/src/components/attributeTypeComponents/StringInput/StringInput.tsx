import React from 'react';
import { Box, Grid, Flex, NumberInput, Checkbox } from '@strapi/design-system';
import { GeneralProps } from '../types';
import { AttributeType } from '../../../pages/HomePage/types';
import { Typography } from '@strapi/design-system';

interface Props extends GeneralProps {
	values: { min: number; max: number; minSymbols: number; maxSymbols: number };
	onChangeValue: (key: string, field: string) => (value: number) => void;
}

const StringInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	values,
	onChangeCheck,
	onChangeValue
}: Props) => {
	return (
		<Grid.Item col={6}>
			<Box marginBottom="8px">
				<Box marginBottom="12px">
					<Checkbox
						disabled={disabled}
						onCheckedChange={() => {
							onChangeCheck(attributeKey);
						}}
						checked={checked}
					>
						{`${attributeKey} (Field type: ${
							attribute.type === AttributeType.String ||
							attribute.type == AttributeType.Text
								? 'String'
								: 'Richtext'
						})`}
						{required && (
							<>
								; <strong>Required</strong>
							</>
						)}
					</Checkbox>
				</Box>
				<Flex gap="16px">
					<Box flex="1">
						<Typography>min count words</Typography>
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
						<Typography>max count words</Typography>
						<NumberInput
							name=""
							disabled={!checked}
							onValueChange={(value) =>
								onChangeValue(attributeKey, 'max')(value || 1)
							}
							value={values.max}
						></NumberInput>
					</Box>
					<Box flex="1">
						<Typography>min count symbols</Typography>
						<NumberInput
							name=""
							disabled={!checked}
							onValueChange={(value) =>
								onChangeValue(attributeKey, 'minSymbols')(value || 1)
							}
							value={values.minSymbols}
						></NumberInput>
					</Box>
					<Box flex="1">
						<Typography>max count symbols</Typography>
						<NumberInput
							name=""
							disabled={!checked}
							onValueChange={(value) =>
								onChangeValue(attributeKey, 'maxSymbols')(value || 1)
							}
							value={values.maxSymbols}
						></NumberInput>
					</Box>
				</Flex>
			</Box>
		</Grid.Item>
	);
};

export default StringInput;
