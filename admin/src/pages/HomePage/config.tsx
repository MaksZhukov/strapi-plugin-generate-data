import React from 'react';
import IntegerInputs from '../../components/attributeTypeComponents/IntegerInputs';
import Email from '../../components/attributeTypeComponents/Email';
import StringInput from '../../components/attributeTypeComponents/StringInput';
import DateInputs from '../../components/attributeTypeComponents/DateInputs';
import MediaInputs from '../../components/attributeTypeComponents/MediaInputs';
import { Values } from './types';

let getStringInput = ({
	key,
	attribute,
	onChangeCheck,
	onChangeValue,
	checked,
	values,
}) => (
	<StringInput
		attribute={attribute}
		attributeKey={key}
		values={values[key] as { count: number }}
		checked={checked}
		onChangeCheck={onChangeCheck}
		onChangeValue={onChangeValue}></StringInput>
);

export const getAttributeInputs = ({
	key,
	attribute,
	onChangeCheck,
	onChangeValue,
	values,
	checkedAttributes,
}: {
	key: string;
	attribute: any;
	values: Values;
	onChangeCheck: (key: string) => void;
	onChangeValue: (key: string, field: string) => void;
	checkedAttributes: string[];
}) => {
	const checked = checkedAttributes.includes(key);
	return {
		['integer']: (
			<IntegerInputs
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { min: number; max: number }}
				checked={checked}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}></IntegerInputs>
		),
		['richtext']: getStringInput({
			key,
			attribute,
			onChangeCheck,
			onChangeValue,
			checked,
			values,
		}),
		['string']: getStringInput({
			key,
			attribute,
			onChangeCheck,
			onChangeValue,
			checked,
			values,
		}),
		['email']: (
			<Email
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></Email>
		),
		['date']: (
			<DateInputs
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { from: Date; to: Date }}
				checked={checked}
				onChangeValue={onChangeValue}
				onChangeCheck={onChangeCheck}></DateInputs>
		),
		['media']: (
			<MediaInputs
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				values={
					values[key] as {
						width: number;
						height: number;
						min: number;
						max: number;
					}
				}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}></MediaInputs>
		),
	};
};
