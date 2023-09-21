export enum AttributeType {
	Integer = 'integer',
	String = 'string',
	Text = 'text',
	Richtext = 'richtext',
	Email = 'email',
	Date = 'date',
	Media = 'media',
	Boolean = 'boolean',
	Enumeration = 'enumeration',
	Password = 'password',
	UID = 'uid',
	Decimal = 'decimal',
	Relation = 'relation',
	JSON = 'json'
}

export type Values = {
	[key: string]: { min: number; max: number } | { from: Date; to: Date } | { pageCount: number };
};

export type AllowedTypes = 'images' | 'videos' | 'files' | 'audios';

export type Attribute = {
	type: AttributeType;
	targetField: string;
	target: string;
	enum: string[];
	min: number;
	max: number;
	multiple: boolean;
	allowedTypes: AllowedTypes[];
};
