import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox, Typography } from '@strapi/design-system';
import { GeneralProps } from '../types';

const PasswordInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
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
};

export default PasswordInput;
