import { $, ElementFinder } from 'protractor';

/**
 * Input text page component
 */
export class InputTextPageComponent {
    private component: ElementFinder;

    constructor(elementFinder: ElementFinder | string = null) {
        this.component = typeof elementFinder === 'object' ? elementFinder : $('[type="text"]');
    }

    public async isDisabled(): Promise<boolean> {
        return (await this.component.getAttribute('disabled')) === 'true';
    }

    public async getValue(): Promise<string> {
        return (await this.component.getAttribute('value')) || '';
    }

    public async setValue(value: string): Promise<void> {
        return this.component.sendKeys(value);
    }

    public async clearValue(): Promise<void> {
        return this.component.clear();
    }
}