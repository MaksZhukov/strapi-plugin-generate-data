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
  JSON = 'json',
}

export type Values = {
  [key: string]:
    | { min: number; max: number }
    | { from: Date; to: Date }
    | { pageCount: number };
} | null;
