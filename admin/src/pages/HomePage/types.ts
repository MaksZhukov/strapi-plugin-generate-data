export enum AttributeType {
	Integer = 'integer',
	String = 'string',
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
}

export type Values = {
	[key: string]:
		| { count: number }
		| { min: number; max: number }
		| { from: Date; to: Date }
		| { pageCount: number };
} | null;
