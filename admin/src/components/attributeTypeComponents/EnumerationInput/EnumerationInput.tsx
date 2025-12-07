import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox, Typography } from '@strapi/design-system';
import { GeneralProps } from '../types';

const EnumerationInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
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
	</Grid.Item>
);

export default EnumerationInput;
