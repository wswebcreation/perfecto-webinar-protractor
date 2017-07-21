import { $, by, element } from 'protractor';

const TIME_BUTTON_SELECTOR = '.rp-Reisplanbalk__buttonInput';
const TIME_LIST_ITEM_SELECTOR = '.rp-Timepicker__times .list__item button';

/**
 * The timepicker page component.
 *
 * For now it can only set the time, we can now easily add a method to retrieve the (pre)selected time with
 *  `this.getTime = () => { // code implementation }`
 */
export class TimePickerPageComponent {

    public async setValue(time: string): Promise<void> {
        await this.openTimepicker();
        await this.setTime(time);
    }

    private async openTimepicker(): Promise<void> {
        return $(TIME_BUTTON_SELECTOR).click();
    }

    private async setTime(time: string): Promise<void> {
        if (!/\d{2}:\d{2}/.test(time)) {
            console.warn(`\nWARNING: 'timepicker.setValue(${time})' failed. ${time} is not a valid value, it should be [01:01]|[13:25]\n`);
        }

        return element(by.cssContainingText(TIME_LIST_ITEM_SELECTOR, time)).click();
    }
}