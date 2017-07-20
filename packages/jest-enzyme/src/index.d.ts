/// <reference types="react" />

declare namespace jest {
    interface Matchers<R> {
        toBeChecked(): void;
        toBeDisabled(): void;
        toBeEmpty(): void;
        toBePresent(): void;
        toContainReact(component: React.ReactElement<any>): void;
        toHaveClassName(className: string): void;
        toHaveHTML(html: string): void;
        toHaveProp(propKey: string, propValue?: any): void;
        toHaveRef(refName: string): void;
        toHaveState(stateKey: string, stateValue?: any): void;
        toHaveStyle(styleKey: string, styleValue?: any): void;
        toHaveTagName(tagName: string): void;
        toHaveText(text: string): void;
        toIncludeText(text: string): void;
        toHaveValue(value: any): void;
        toMatchElement(element: React.ReactElement<any>): void;
        toMatchSelector(selector: string): void;
    }
}
