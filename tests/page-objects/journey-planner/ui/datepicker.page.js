'use strict';

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
module.exports = function DatepickerPageComponent() {
    /**
     * Set the date by first opening the datepicker, selecting the month and day
     *
     * @param {string} time The time that needs to be selected, format {01 June}
     * @return {Promise.<void>}
     */
    this.setValue = (date) => {
        let day, month;
        [day, month] = date.split(' ');

        _openDatepicker();
        _setMonth(month);
        return _setDay(day);
    };
};

/**
 * Open the datepicker
 *
 * @return {Promise<void>}
 *
 * @private
 */
function _openDatepicker(){
    return $(DATE_BUTTON_SELECTOR).click();
}

/**
 * Set the month in the datepicker, format is {June}
 *
 * @param {string} month The month that needs to be selected
 * @return {Promise<void>}
 *
 * @private
 */
function _setMonth(month) {
    let clickAmount, selectedMonth;

    if (MONTHS.indexOf(month) === -1) {
        console.warn(`\nWARNING: 'datepicker.setValue()' failed. ${month} is not a valid value, it should be [${MONTHS.join(',')}] \n`);
    }

    return $(DATEPICKER_MONTH_SELECTOR).getText()
        .then((monthYear) => {
            [selectedMonth] = monthYear.split(' ');

            const selectedMonthIndex = MONTHS.indexOf(selectedMonth);
            const newMonthIndex = MONTHS.indexOf(month);
            let clicksPromises = [];

            if (newMonthIndex === selectedMonthIndex) {
                clickAmount = 0;
            } else if (newMonthIndex > selectedMonthIndex) {
                clickAmount = newMonthIndex - selectedMonthIndex;
            } else {
                clickAmount = 12 - (selectedMonthIndex - newMonthIndex);
            }

            for (let i = 0; i < clickAmount; i++) {
                clicksPromises.push($(DATEPICKER_MONTH_FORWARD_SELECTOR).click());
            }

            return Promise.all(clicksPromises);
        })
}

/**
 * Set the day in the datepicker
 *
 * @param {string} day The day that needs to be selected, format is {01}
 * @return {Promise<void>}
 *
 * @private
 */
function _setDay(day) {
    if (!/\d{2}/.test(day)) {
        console.warn(`\nWARNING: 'datepicker.setValue()' failed. ${day} is not a valid value, it should be '01' | '12' \n`);
    }

    return element.all(by.cssContainingText(DATEPICKER_DAY_SELECTOR_SELECTOR, day)).last().click();
}