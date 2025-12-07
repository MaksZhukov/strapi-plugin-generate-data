import React from 'react';
import { Box, Grid, Flex, Checkbox, NumberInput, Typography } from '@strapi/design-system';
import { GeneralProps } from '../types';
interface Props extends GeneralProps {
	onChangeValue: (key: string, field: string) => (value: number) => void;
	values: { width: number; height: number; min: number; max: number };
}

const MediaInputs = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
	values,
	onChangeCheck,
	onChangeValue
}: Props) => {
	const allowedImages = attribute.allowedTypes.includes('images');
	return (
		<Grid.Item col={12}>
			<Box marginBottom="8px">
				<Box marginBottom="12px">
					<Checkbox
						disabled={disabled}
						onCheckedChange={() => onChangeCheck(attributeKey)}
						checked={checked}
					>
						{`${attributeKey} (Field type: Media) Allowed types: ${attribute.allowedTypes.join(
							', '
						)}`}
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
				{allowedImages && (
					<Flex gap="16px">
						<Box flex="1">
							<Typography>width (px) for images</Typography>
							<NumberInput
								name=""
								disabled={!checked}
								onValueChange={(value) =>
									onChangeValue(attributeKey, 'width')(value || 1)
								}
								value={values.width}
							></NumberInput>
						</Box>
						<Box flex="1">
							<Typography>height (px) for images</Typography>
							<NumberInput
								name=""
								disabled={!checked}
								onValueChange={(value) =>
									onChangeValue(attributeKey, 'height')(value || 1)
								}
								value={values.height}
							></NumberInput>
						</Box>
					</Flex>
				)}
				{attribute.multiple && (
					<Flex marginTop="12px" gap="16px">
						<Box flex="1">
							<Typography>Count min</Typography>
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
							<Typography>Count max</Typography>
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
				)}
			</Box>
		</Grid.Item>
	);
};
export default MediaInputs;
