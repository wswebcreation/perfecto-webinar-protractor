'use strict';

const ARRIVAL_TIME_SELECTOR = '.rp-aankomstTijd';
const DEPARTURE_TIME_SELECTOR = '.rp-vertrekTijd';
const TRANSFERS_SELECTOR = '.rp-rp-mogelijkheid__transfer';
const TRAVEL_INFO_SELECTOR = '.rp-mogelijkheid__travelInfo modaliteit';
const TRAVEL_TIME_SELECTOR = '.rp-mogelijkheid__reistijd';

module.exports = PossibilityPageObject;

function PossibilityPageObject(elementFinder) {
    this.getArrivalTime = () => elementFinder.$(ARRIVAL_TIME_SELECTOR).getText().then((text) => text.trim());
    this.getDepartureTime = () => elementFinder.$(DEPARTURE_TIME_SELECTOR).getText().then((text) => text.trim());
    this.getTransfers = () => elementFinder.$(TRANSFERS_SELECTOR).getText().then((text) => text.trim());
    this.getTravelInfo = () => elementFinder.$$(TRAVEL_INFO_SELECTOR).getText().then((textArray) => textArray.join(", "));
    this.getTravelTime = () => elementFinder.$(TRAVEL_TIME_SELECTOR).getText().then((text) => text.trim());
}