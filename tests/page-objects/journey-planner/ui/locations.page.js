'use strict';
const InputText = require('./input-text.page');

const LOCATION_DEPARTURE = '#location_input_departure';
const LOCATION_ARRIVAL = '#location_input_arrival';

module.exports = locationsPage();

function locationsPage() {
    return {
        departure: departure,
        arrival: arrival
    };

    /**
     * Create an instance of the departure input text component
     */
    function departure(){
        return new InputText(LOCATION_DEPARTURE);
    }


    /**
     * Create an instance of the arrival input text component
     */
    function arrival(){
        return new InputText(LOCATION_ARRIVAL);
    }
}