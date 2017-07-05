'use strict';
const InputText = require('./input-text.page');

const LOCATION_DEPARTURE_SELECTOR = '#location_input_departure';
const LOCATION_ARRIVAL_SELECTOR = '#location_input_arrival';

module.exports = function LocationsPageObject() {
    this.departureStationField = () => new InputText(LOCATION_DEPARTURE_SELECTOR);
    this.arrivalStationField = () => new InputText(LOCATION_ARRIVAL_SELECTOR);
};