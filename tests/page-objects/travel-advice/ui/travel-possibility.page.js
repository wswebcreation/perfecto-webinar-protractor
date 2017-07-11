'use strict';

const ARRIVAL_TIME_SELECTOR = '.rp-aankomstTijd';
const DEPARTURE_TIME_SELECTOR = '.rp-vertrekTijd';
const TRANSFERS_SELECTOR = '.rp-rp-mogelijkheid__transfer';
const TRAVEL_INFO_SELECTOR = '.rp-mogelijkheid__travelInfo modaliteit';
const TRAVEL_TIME_SELECTOR = '.rp-mogelijkheid__reistijd';

module.exports = PossibilityPageObject;

/**
 * The travel possibility page component.
 */
function PossibilityPageObject(elementFinder) {
    /**
     * Get the arrival time text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getArrivalTime = () => elementFinder.$(ARRIVAL_TIME_SELECTOR).getText().then((text) => text.trim());

    /**
     * Get the departure time text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getDepartureTime = () => elementFinder.$(DEPARTURE_TIME_SELECTOR).getText().then((text) => text.trim());

    /**
     * Get the transfers text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getTransfers = () => elementFinder.$(TRANSFERS_SELECTOR).getText().then((text) => text.trim());

    /**
     * Get the travel info text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string, separated by `,`
     */
    this.getTravelInfo = () => elementFinder.$$(TRAVEL_INFO_SELECTOR).getText().then((textArray) => textArray.join(", "));

    /**
     * Get the travel time, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getTravelTime = () => elementFinder.$(TRAVEL_TIME_SELECTOR).getText().then((text) => text.trim());

    /**
     * Open the travel
     *
     * @return {Promise<void>}
     */
    this.open = () => elementFinder.click();
}