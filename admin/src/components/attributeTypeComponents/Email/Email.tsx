import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox, Typography } from '@strapi/design-system';
import { GeneralProps } from '../types';

const Email = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	onChangeCheck
}: GeneralProps): ReactElement => (
	<Grid.Item col={6}>
		<Box marginBottom="8px">
			<Checkbox
				disabled={disabled}
				onCheckedChange={() => onChangeCheck(attributeKey)}
				checked={checked}
			>
				{`${attributeKey} (Field type: Email)`}
				{disabled && required && (
					<Typography textColor="neutral600" variant="pi" style={{ marginLeft: '8px' }}>
						(Required)
					</Typography>
				)}
			</Checkbox>
		</Box>
	</Grid.Item>
);

export default Email;
