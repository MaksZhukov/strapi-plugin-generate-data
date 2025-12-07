import React, { ReactElement } from 'react';
import { Box, Grid, Checkbox, Typography } from '@strapi/design-system';
import { GeneralProps } from '../types';

interface Props extends GeneralProps {
	values: { pageCount: number };
}

const RelationInput = ({
	attribute,
	attributeKey,
	checked,
	disabled,
	required,
	unique,
	values,
	onChangeCheck
}: Props): ReactElement => {
	return (
		<Grid.Item col={6}>
			<Box marginBottom="8px">
				<Checkbox
					disabled={disabled || values.pageCount === 0}
					onCheckedChange={() => onChangeCheck(attributeKey)}
					checked={checked}
				>
					{`${attributeKey} (Field type: Relation)`}
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
					{values.pageCount === 0 && (
						<Typography textColor="warning500" variant="delta">
							Generate or add data for the type
						</Typography>
					)}
				</Checkbox>
			</Box>
		</Grid.Item>
	);
};

export default RelationInput;
