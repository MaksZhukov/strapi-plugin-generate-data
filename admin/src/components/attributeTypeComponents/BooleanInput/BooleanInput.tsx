import { ReactElement } from 'react';
import { Box, Grid, Checkbox } from '@strapi/design-system';
import { GeneralProps } from '../types';

const BooleanInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	onChangeCheck
}: GeneralProps): ReactElement => {
	return (
		<Grid.Item col={6}>
			<Box marginBottom="8px">
				<Checkbox
					onCheckedChange={() => onChangeCheck(attributeKey)}
					checked={checked}
					disabled={disabled}
				>
					{`${attributeKey} (Field type: Boolean)`}
				</Checkbox>
			</Box>
		</Grid.Item>
	);
};

export default BooleanInput;
