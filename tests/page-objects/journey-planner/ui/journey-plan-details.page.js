'use strict';
const Datepicker = require('./datepicker.page');
const InputText = require('./input-text.page');
const Timepicker = require('./timepicker.page');

const ARRIVAL_STATION_SELECTOR = '#location_input_arrival';
const DEPARTURE_STATION_SELECTOR = '#location_input_departure';
const SUBMIT_SELECTOR = '.rp-Reisplanbalk__submit';

module.exports = function JourneyDetails() {
    /**
     * Get the departure station field,
     * you can now use all the input methods (like setValue, getValue, ..) on it
     *
     * @return {ElementFinder}
     */
    this.departureStation = () => new InputText(DEPARTURE_STATION_SELECTOR);

    /**
     * Get the arrival station field,
     * you can now use all the input methods (like setValue, getValue, ..) on it
     *
     * @return {ElementFinder}
     */
    this.arrivalStation = () => new InputText(ARRIVAL_STATION_SELECTOR);

    /**
     * Set the date.
     * Now a datepicker is used, but if in the future a different component is used to set the date it only needs to be changed here
     *
     * @param {string} date
     *
     * @return {Promise<void>}
     */
    this.setDate = (date) => {
        const datepicker = new Datepicker();
        return datepicker.setDate(date);
    };

    /**
     * Set the time
     *
     * @param {string} time in the format [01:01] | [13:25]
     *
     * @return {Promise<void>}
     */
    this.setTime = (time) => {
        const timepicker = new Timepicker();
        return timepicker.setTime(time);
    };

    /**
     * Submit the journey
     *
     * @return {Promise<void>}
     */
    this.submitJourney = () => $(SUBMIT_SELECTOR).click();
};