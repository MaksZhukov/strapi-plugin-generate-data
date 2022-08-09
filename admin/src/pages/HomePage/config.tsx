import React from 'react';
import IntegerInputs from '../../components/attributeTypeComponents/IntegerInputs';
import Email from '../../components/attributeTypeComponents/Email';
import StringInput from '../../components/attributeTypeComponents/StringInput';
import DateInputs from '../../components/attributeTypeComponents/DateInputs';
import MediaInputs from '../../components/attributeTypeComponents/MediaInputs';
import { AttributeType, Values } from './types';
import BooleanInput from '../../components/attributeTypeComponents/BooleanInput';
import EnumerationInput from '../../components/attributeTypeComponents/EnumerationInput';
import PasswordInput from '../../components/attributeTypeComponents/PasswordInput';
import UIDInput from '../../components/attributeTypeComponents/UIDInput';
import DecimalInputs from '../../components/attributeTypeComponents/DecimalInputs';
import RelationInput from '../../components/attributeTypeComponents/RelationInput';

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
	const stringInput = getStringInput({
		key,
		attribute,
		onChangeCheck,
		onChangeValue,
		checked,
		values,
	});

	return {
		[AttributeType.Integer]: (
			<IntegerInputs
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { min: number; max: number }}
				checked={checked}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}></IntegerInputs>
		),
		[AttributeType.Richtext]: stringInput,
		[AttributeType.String]: stringInput,
		[AttributeType.Email]: (
			<Email
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></Email>
		),
		[AttributeType.Date]: (
			<DateInputs
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { from: Date; to: Date }}
				checked={checked}
				onChangeValue={onChangeValue}
				onChangeCheck={onChangeCheck}></DateInputs>
		),
		[AttributeType.Media]: (
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
		[AttributeType.Boolean]: (
			<BooleanInput
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></BooleanInput>
		),
		[AttributeType.Enumeration]: (
			<EnumerationInput
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></EnumerationInput>
		),
		[AttributeType.Password]: (
			<PasswordInput
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></PasswordInput>
		),
		[AttributeType.UID]: (
			<UIDInput
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></UIDInput>
		),
		[AttributeType.Decimal]: (
			<DecimalInputs
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { min: number; max: number }}
				checked={checked}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}></DecimalInputs>
		),
		[AttributeType.Relation]: (
			<RelationInput
				values={values[key] as { pageCount: number }}
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}></RelationInput>
		),
	};
};
