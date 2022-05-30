import React from 'react';
import './AutoCompleteTextField.css';
interface IAutocompleteTextFieldProps {
    Component: React.ElementType;
    defaultValue: string;
    disabled: boolean;
    maxOptions: number;
    onBlur: () => void;
    onChange: (value: string) => void;
    onChangeAdapter: (e: any, ref: React.RefObject<HTMLInputElement>) => Partial<React.ChangeEvent<HTMLInputElement>>;
    onKeyDown: (event: React.KeyboardEvent) => void;
    onRequestOptions: (part: string) => void;
    onSelect: (value: string) => void;
    changeOnSelect: (trigger: string, slug: string) => string;
    options: string[] | any;
    regex: string;
    matchAny: boolean;
    minChars: number;
    requestOnlyIfNoOptions: boolean;
    spaceRemovers: string[];
    spacer: string;
    trigger: string | string[];
    value: string;
    offsetX: number;
    offsetY: number;
    passThroughEnter: boolean;
}
interface IAutocompleteTextFieldState {
    helperVisible: boolean;
    left: number;
    trigger: null | string;
    matchLength: number;
    matchStart: number;
    options: string[];
    selection: number;
    top: number;
    value: null | string;
    caret: number;
}
declare class AutocompleteTextField extends React.Component<IAutocompleteTextFieldProps, IAutocompleteTextFieldState> {
    private refInput;
    private recentValue;
    private enableSpaceRemovers;
    static defaultProps: IAutocompleteTextFieldProps;
    constructor(props: IAutocompleteTextFieldProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    getMatch(str: string, caret: number, providedOptions: string[] | any): any;
    arrayTriggerMatch(triggers: string[], re: RegExp): {
        triggerStr: string;
        triggerMatch: RegExpMatchArray;
        triggerLength: number;
    }[];
    isTrigger(trigger: string, str: string, i: number): boolean;
    handleChange(e: any): void;
    handleChangeEvent(e: Partial<React.ChangeEvent<HTMLInputElement>>): void;
    handleKeyDown(event: React.KeyboardEvent): void;
    handleResize(): void;
    handleSelection(idx: number): void;
    updateCaretPosition(caret: number): void;
    updateHelper(str: string, caret: number, options: string[]): void;
    resetHelper(): void;
    renderAutocompleteList(): JSX.Element;
    render(): JSX.Element;
}
export default AutocompleteTextField;
//# sourceMappingURL=AutoCompleteTextField.d.ts.map