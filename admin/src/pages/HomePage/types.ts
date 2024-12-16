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
	[key: string]:
		| { width: number; height: number }
		| { min: number; max: number }
		| { minSymbols: number; maxSymbols: number }
		| { from: Date; to: Date }
		| { pageCount: number }
		| {};
};

export type AllowedTypes = 'images' | 'videos' | 'files' | 'audios';

export type Attribute = {
	type: AttributeType;
	targetField: string;
	target: string;
	enum: string[];
	min: number;
	max: number;
	minSymbols: number;
	maxSymbols: number;
	multiple: boolean;
	allowedTypes: AllowedTypes[];
	regex?: string;
};

export type GeneratedData = { [key: string]: any };
