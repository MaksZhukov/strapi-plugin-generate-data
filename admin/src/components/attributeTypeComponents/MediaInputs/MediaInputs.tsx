import React from 'react';
import { Box, Grid, Flex, Checkbox, NumberInput } from '@strapi/design-system';
import { GeneralProps } from '../types';
import { Typography } from '@strapi/design-system';
interface Props extends GeneralProps {
	onChangeValue: (key: string, field: string) => void;
	values: { width: number; height: number; min: number; max: number };
}

const MediaInputs = ({
	attribute,
	attributeKey,
	checked,
	disabled,
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
					</Checkbox>
				</Box>
				{allowedImages && (
					<Flex gap="16px">
						<Box flex="1">
							<Typography>width (px) for images</Typography>
							<NumberInput
								name=""
								disabled={!checked}
								onValueChange={onChangeValue(attributeKey, 'width')}
								value={values.width}
							></NumberInput>
						</Box>
						<Box flex="1">
							<Typography>height (px) for images</Typography>
							<NumberInput
								name=""
								disabled={!checked}
								onValueChange={onChangeValue(attributeKey, 'height')}
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
								onValueChange={onChangeValue(attributeKey, 'min')}
								value={values.min}
							></NumberInput>
						</Box>
						<Box flex="1">
							<Typography>Count max</Typography>
							<NumberInput
								name=""
								disabled={!checked}
								onValueChange={onChangeValue(attributeKey, 'max')}
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
