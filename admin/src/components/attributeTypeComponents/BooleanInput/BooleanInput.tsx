import { ReactElement } from 'react';
import {
	Box,
	Grid,
	Checkbox,
	SingleSelect,
	SingleSelectOption,
	Typography
} from '@strapi/design-system';
import { GeneralProps } from '../types';

interface Props extends GeneralProps {
	values: { value: 'random' | true | false };
	onChangeValue: (key: string, field: string) => (value: 'random' | boolean) => void;
}

const BooleanInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
	onChangeCheck,
	values,
	onChangeValue
}: Props): ReactElement => {
	return (
		<Grid.Item col={6}>
			<Box marginBottom="8px">
				<Box marginBottom="12px">
					<Checkbox
						onCheckedChange={() => onChangeCheck(attributeKey)}
						checked={checked}
						disabled={disabled}
					>
						{`${attributeKey} (Field type: Boolean)`}
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
				<Box>
					<Typography>Value</Typography>
					<SingleSelect
						disabled={!checked}
						value={
							values.value === true
								? 'true'
								: values.value === false
									? 'false'
									: 'random'
						}
						onChange={(value: string) => {
							if (value === 'random') {
								onChangeValue(attributeKey, 'value')('random');
							} else {
								onChangeValue(attributeKey, 'value')(value === 'true');
							}
						}}
					>
						<SingleSelectOption value="random">Random</SingleSelectOption>
						<SingleSelectOption value="true">True</SingleSelectOption>
						<SingleSelectOption value="false">False</SingleSelectOption>
					</SingleSelect>
				</Box>
			</Box>
		</Grid.Item>
	);
};

export default BooleanInput;
