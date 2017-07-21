import { $, by, element } from 'protractor';

const DATE_BUTTON_SELECTOR = '.rp-DateButton';
const DATEPICKER_CONTAINER_SELECTOR = '[ng-model="datepickerCtrl.date"]';
const DATEPICKER_MONTH_SELECTOR = `${DATEPICKER_CONTAINER_SELECTOR} .uib-title`;
const DATEPICKER_MONTH_FORWARD_SELECTOR = `${DATEPICKER_CONTAINER_SELECTOR} .uib-right`;
const DATEPICKER_DAY_SELECTOR_SELECTOR = `${DATEPICKER_CONTAINER_SELECTOR} td button`;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * The datepicker page component.
 *
 * For now it can only set the date, we can now easily add a method to retrieve the (pre)selected date with
 *  `this.getValue = () => { // code implementation }`
 */
export class DatepickerPageComponent {
    public async setValue(date: string): Promise<void> {
        const [day, month] = date.split(' ');

        await this.openDatepicker();
        await this.setMonth(month);
        await this.setDay(day);
    }

    private async openDatepicker(): Promise<void> {
        await $(DATE_BUTTON_SELECTOR).click();
    }

    private async setMonth(month: string): Promise<void> {
        let clickAmount = 0;

        if (MONTHS.indexOf(month) === -1) {
            console.warn(`\nWARNING: 'datepicker.setValue()' failed. ${month} is not a valid value, it should be [${MONTHS.join(',')}] \n`);
        }

        const [selectedMonth] = (await $(DATEPICKER_MONTH_SELECTOR).getText()).split(' ');
        const selectedMonthIndex = MONTHS.indexOf(selectedMonth);
        const newMonthIndex = MONTHS.indexOf(month);

        if (newMonthIndex > selectedMonthIndex) {
            clickAmount = newMonthIndex - selectedMonthIndex;
        } else if (newMonthIndex < selectedMonthIndex) {
            clickAmount = 12 - (selectedMonthIndex - newMonthIndex);
        }

        for (let i = 0; i < clickAmount; i++) {
            await $(DATEPICKER_MONTH_FORWARD_SELECTOR).click();
        }
    }

    private async setDay(day: string): Promise<void> {
        if (!/\d{2}/.test(day)) {
            console.warn(`\nWARNING: 'datepicker.setValue()' failed. ${day} is not a valid value, it should be '01' | '12' \n`);
        }

        await element.all(by.cssContainingText(DATEPICKER_DAY_SELECTOR_SELECTOR, day)).last().click();
    }
}