export type Values = {
	[key: string]:
		| { count: number }
		| { min: number; max: number }
		| { from: Date; to: Date };
} | null;
