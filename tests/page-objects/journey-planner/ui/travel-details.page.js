'use strict';
const DatePicker = require('./datepicker.page');

const TIME_BUTTON_SELECTOR = '.rp-Reisplanbalk__buttonInput';
const TIME_LIST_ITEM_SELECTOR = '.rp-Timepicker__times .list__item';
const SUBMIT_SELECTOR = '.rp-Reisplanbalk__submit';

module.exports = function travelDetails() {
    this.setDate = (date) => {
        const datePicker = new DatePicker();
        return datePicker.setDate(date);
    };

    this.setTime = (time) => {
        if (!/\d{2}:\d{2}/.test(time)) {
            console.warn(`\nWARNING: 'setTime(${time})' failed. ${time} is not a valid value, it should be [01:01] | [13:25]\n`);
        }

        $(TIME_BUTTON_SELECTOR).click();
        return element(by.cssContainingText(TIME_LIST_ITEM_SELECTOR, time)).click();
    };

    this.submit = () => $(SUBMIT_SELECTOR).click();
};