/// <reference types="react" />

declare namespace jest {
    interface Matchers {
        toBeChecked(): void;
        toBeDisabled(): void;
        toBeEmpty(): void;
        toBePresent(): void;
        toContainReact(component: React.Component<any, any>): void;
        toHaveClassName(className: string): void;
        toHaveHTML(html: string): void;
        toHaveProp(propKey: string, propValue?: any): void;
        toHaveRef(refName: string): void;
        toHaveState(stateKey: string, stateValue?: any): void;
        toHaveStyle(styleKey: string, styleValue?: any): void;
        toHaveTagName(tagName: string): void;
        toHaveText(text: string);
        toIncludeText(text: string);
        toHaveValue(value: any);
        toMatchSelector(selector: string);
    }
}
