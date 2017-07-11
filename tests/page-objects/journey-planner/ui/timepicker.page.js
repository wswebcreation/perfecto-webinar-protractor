'use strict';

const TIME_BUTTON_SELECTOR = '.rp-Reisplanbalk__buttonInput';
const TIME_LIST_ITEM_SELECTOR = '.rp-Timepicker__times .list__item button';

/**
 * The timepicker page component.
 *
 * For now it can only set the time, we can now easily add a method to retrieve the (pre)selected time with
 *  `this.getTime = () => { // code implementation }`
 */
module.exports = function TimePickerPageComponent() {
    /**
     * Set the time by first opening the timepicker
     *
     * @param {string} time The time that needs to be selected, format is [01:01] | [13:25]
     * @return {Promise.<void>}
     */
    this.setValue = (time) => {
        _openTimepicker();
        return _setTime(time);
    };
};

/**
 * Open the timepicker
 *
 * @return {Promise<void>}
 *
 * @private
 */
function _openTimepicker() {
    return $(TIME_BUTTON_SELECTOR).click();
}

/**
 * Set the time in the timepicker
 *
 * @param {string} time The time that needs to be selected, format is [01:01] | [13:25]
 * @return {Promise<void>}
 *
 * @private
 */
function _setTime(time) {
    if (!/\d{2}:\d{2}/.test(time)) {
        console.warn(`\nWARNING: 'timepicker.setValue(${time})' failed. ${time} is not a valid value, it should be [01:01] | [13:25]\n`);
    }

    return element(by.cssContainingText(TIME_LIST_ITEM_SELECTOR, time)).click();
}