export interface GeneralProps {
	attribute: any;
	attributeKey: string;
	checked: boolean;
	disabled: boolean;
	required?: boolean;
	onChangeCheck: (key: string) => void;
}
