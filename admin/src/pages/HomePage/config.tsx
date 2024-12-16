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
import JSONInput from '../../components/attributeTypeComponents/JSONInput';

let getStringInput = ({
	key,
	attribute,
	onChangeCheck,
	onChangeValue,
	checked,
	disabled,
	values
}: {
	key: string;
	attribute: any;
	values: Values;
	onChangeCheck: (key: string) => void;
	onChangeValue: (key: string, field: string) => void;
	disabled: boolean;
	checked: boolean;
}) => (
	<StringInput
		key={key}
		disabled={disabled}
		attribute={attribute}
		attributeKey={key}
		values={values[key] as { min: number; max: number; maxSymbols: number; minSymbols: number }}
		checked={checked}
		onChangeCheck={onChangeCheck}
		onChangeValue={onChangeValue}
	></StringInput>
);

export const getAttributeInputs = ({
	key,
	attribute,
	attributes,
	onChangeCheck,
	onChangeValue,
	values,
	checkedAttributes
}: {
	key: string;
	attribute: any;
	values: Values;
	onChangeCheck: (key: string) => void;
	onChangeValue: (key: string, field: string) => void;
	checkedAttributes: string[];
	attributes: any;
}) => {
	let sourceAttributeKey = Object.keys(attributes).find(
		(attrKey) => attributes[attrKey].targetField === key
	);

	let disabled =
		(sourceAttributeKey && checkedAttributes.includes(sourceAttributeKey)) ||
		attribute.required;
	const checked = checkedAttributes.includes(key);
	const stringInput = getStringInput({
		key,
		attribute,
		onChangeCheck,
		onChangeValue,
		checked,
		disabled,
		values
	});

	return {
		[AttributeType.Integer]: (
			<IntegerInputs
				key={key}
				disabled={disabled}
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { min: number; max: number }}
				checked={checked}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}
			></IntegerInputs>
		),
		[AttributeType.Richtext]: stringInput,
		[AttributeType.String]: stringInput,
		[AttributeType.Text]: stringInput,
		[AttributeType.Email]: (
			<Email
				key={key}
				attribute={attribute}
				attributeKey={key}
				disabled={disabled}
				checked={checked}
				onChangeCheck={onChangeCheck}
			></Email>
		),
		[AttributeType.Date]: (
			<DateInputs
				key={key}
				attribute={attribute}
				disabled={disabled}
				attributeKey={key}
				values={values[key] as { from: Date; to: Date }}
				checked={checked}
				onChangeValue={onChangeValue}
				onChangeCheck={onChangeCheck}
			></DateInputs>
		),
		[AttributeType.Media]: (
			<MediaInputs
				key={key}
				attribute={attribute}
				disabled={disabled}
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
				onChangeValue={onChangeValue}
			></MediaInputs>
		),
		[AttributeType.Boolean]: (
			<BooleanInput
				key={key}
				attribute={attribute}
				attributeKey={key}
				disabled={disabled}
				checked={checked}
				onChangeCheck={onChangeCheck}
			></BooleanInput>
		),
		[AttributeType.Enumeration]: (
			<EnumerationInput
				key={key}
				attribute={attribute}
				attributeKey={key}
				disabled={disabled}
				checked={checked}
				onChangeCheck={onChangeCheck}
			></EnumerationInput>
		),
		[AttributeType.Password]: (
			<PasswordInput
				key={key}
				attribute={attribute}
				disabled={disabled}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}
			></PasswordInput>
		),
		[AttributeType.UID]: (
			<UIDInput
				key={key}
				disabled={disabled}
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}
			></UIDInput>
		),
		[AttributeType.Decimal]: (
			<DecimalInputs
				key={key}
				disabled={disabled}
				attribute={attribute}
				attributeKey={key}
				values={values[key] as { min: number; max: number }}
				checked={checked}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}
			></DecimalInputs>
		),
		[AttributeType.Relation]: (
			<RelationInput
				key={key}
				disabled={disabled}
				values={values[key] as { pageCount: number }}
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}
			></RelationInput>
		),
		[AttributeType.JSON]: (
			<JSONInput
				key={key}
				disabled={disabled}
				attribute={attribute}
				attributeKey={key}
				checked={checked}
				onChangeCheck={onChangeCheck}
				onChangeValue={onChangeValue}
				values={values[key] as { min: number; max: number }}
			></JSONInput>
		)
	};
};
