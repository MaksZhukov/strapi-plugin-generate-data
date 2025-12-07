import React, { ReactElement } from 'react';
import { Box, Grid, Typography, Checkbox } from '@strapi/design-system';
import { GeneralProps } from '../types';

const UIDInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	onChangeCheck
}: GeneralProps): ReactElement => {
	return (
		<Grid.Item col={6}>
			<Box marginBottom="8px">
				<Checkbox
					disabled={disabled}
					onCheckedChange={() => onChangeCheck(attributeKey)}
					checked={checked}
				>
					{attribute.targetField ? (
						<>
							{`${attributeKey} (Field type: UID); `}
							{'Target field: '}
							<Typography fontWeight="bold">{attribute.targetField}</Typography>
						</>
					) : (
						`${attributeKey} (Field type: UID)`
					)}
					{disabled && required && (
						<>
							; <strong>Required</strong>
						</>
					)}
				</Checkbox>
			</Box>
		</Grid.Item>
	);
};

export default UIDInput;
