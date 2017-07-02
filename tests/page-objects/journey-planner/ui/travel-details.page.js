'use strict';
const datePicker = require('./datepicker.page');

const TIME_BUTTON = '.rp-Reisplanbalk__buttonInput';
const TIME_LIST_ITEM = '.rp-Timepicker__times .list__item';
const SUBMIT = '.rp-Reisplanbalk__submit';

module.exports = function travelDetails() {
    return {
        setDate: setDate,
        setTime: setTime,
        submit: submit
    };

    /**
     * Select the date
     * @param {string} date The date to be selected, string needs to be like {01 June}
     */
    function setDate(date) {
        return datePicker.setDate(date);
    }

    /**
     * Select the time
     * @param {string} time The time in format {hh:mm}
     */
    function setTime(time) {
        if (!/\d{2}:\d{2}/.test(time)) {
            console.warn(`\nWARNING: 'setTime(${time})' failed. ${time} is not a valid value, it should be [01:01] | [13:25]\n`);
        }

        $(TIME_BUTTON).click();
        return element(by.cssContainingText(TIME_LIST_ITEM, time)).click();
    }

    /**
     * Submit the journey planner form
     */
    function submit() {
        return $(SUBMIT).click();
    }
}();