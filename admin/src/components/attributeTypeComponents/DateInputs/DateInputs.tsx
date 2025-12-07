import { DatePicker, Box, Grid, Flex, Checkbox, Typography } from '@strapi/design-system';
import { GeneralProps } from '../types';

interface Props extends GeneralProps {
	values: { to: Date; from: Date };
	onChangeValue: (key: string, field: string) => (date: Date) => void;
}

const DateInputs = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
	values,
	onChangeValue,
	onChangeCheck
}: Props) => {
	return (
		<Grid.Item col={12}>
			<Box marginBottom="8px">
				<Box marginBottom="12px">
					<Checkbox
						disabled={disabled}
						onCheckedChange={() => onChangeCheck(attributeKey)}
						checked={checked}
					>
						{`${attributeKey} (Field type: Date)`}
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
						<DatePicker
							onChange={(date) =>
								onChangeValue(attributeKey, 'from')(date || new Date())
							}
							value={values.from}
						></DatePicker>
					</Box>
					<Box flex="1">
						<DatePicker
							onChange={(date) =>
								onChangeValue(attributeKey, 'to')(date || new Date())
							}
							value={values.to}
						></DatePicker>
					</Box>
				</Flex>
			</Box>
		</Grid.Item>
	);
};

export default DateInputs;
