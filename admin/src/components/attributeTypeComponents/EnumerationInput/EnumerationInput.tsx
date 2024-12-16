import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox } from '@strapi/design-system';
import { GeneralProps } from '../types';

const EnumerationInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	onChangeCheck
}: GeneralProps): ReactElement => (
	<Grid.Item col={6}>
		<Box marginBottom="8px">
			<Checkbox
				disabled={disabled}
				onCheckedChange={() => onChangeCheck(attributeKey)}
				checked={checked}
			>
				{`${attributeKey} (field type: Enumeration)`}
			</Checkbox>
		</Box>
	</Grid.Item>
);

export default EnumerationInput;
