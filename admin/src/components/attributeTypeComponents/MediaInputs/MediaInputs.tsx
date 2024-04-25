import React from 'react';
import { Box, GridItem, Flex, Checkbox, NumberInput } from '@strapi/design-system';
import { GeneralProps } from '../types';
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
	onChangeValue,
}: Props) => {
	const allowedImages = attribute.allowedTypes.includes('images');
	return (
		<GridItem col={12}>
			<Box marginBottom='8px'>
				<Box marginBottom='12px'>
					<Checkbox
						disabled={disabled}
						onChange={() => onChangeCheck(attributeKey)}
						checked={checked}>
						{`${attributeKey} (Field type: Media) Allowed types: ${attribute.allowedTypes.join(
							', '
						)}`}
					</Checkbox>
				</Box>
				{allowedImages && (
					<Flex gap='16px'>
						<Box flex='1'>
							<NumberInput
								name=''
								disabled={!checked}
								onValueChange={() => onChangeValue(
									attributeKey,
									'width'
								)}
								value={values.width}
								label={`width (px) for images`}></NumberInput>
						</Box>
						<Box flex='1'>
							<NumberInput
								name=''
								disabled={!checked}
								onValueChange={() => onChangeValue(
									attributeKey,
									'height'
								)}
								value={values.height}
								label={`height (px) for images`}></NumberInput>
						</Box>
					</Flex>
				)}
				{attribute.multiple && (
					<Flex marginTop='12px' gap='16px'>
						<Box flex='1'>
							<NumberInput
								name=''
								disabled={!checked}
								onValueChange={() => onChangeValue(
									attributeKey,
									'min'
								)}
								value={values.min}
								label={`Count min`}></NumberInput>
						</Box>
						<Box flex='1'>
							<NumberInput
								name=''
								disabled={!checked}
								onValueChange={() => onChangeValue(
									attributeKey,
									'max'
								)}
								value={values.max}
								label={`Count max`}></NumberInput>
						</Box>
					</Flex>
				)}
			</Box>
		</GridItem>
	);
};
export default MediaInputs;
