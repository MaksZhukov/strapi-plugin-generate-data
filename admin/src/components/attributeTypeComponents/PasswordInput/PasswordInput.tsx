import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox } from '@strapi/design-system';
import { GeneralProps } from '../types';

const PasswordInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	onChangeCheck
}: GeneralProps): ReactElement => {
	return (
		<Grid.Item alignItems="start" col={6}>
			<Box marginBottom="8px">
				<Checkbox
					disabled={disabled}
					onCheckedChange={() => onChangeCheck(attributeKey)}
					checked={checked}
				>
					{`${attributeKey} (Field type: Password)`}
				</Checkbox>
			</Box>
		</Grid.Item>
	);
};

export default PasswordInput;
