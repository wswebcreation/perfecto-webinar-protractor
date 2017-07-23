'use strict';

const TRAVEL_DETAILS_CONTAINER = '.rp-reisdetails';
const JOURNEY_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-reisdetails__journey`;
const OPEN_JOURNEY_SELECTOR = `${JOURNEY_SELECTOR} .rp-Traject__description`;
const DEPARTURE_PLATFORM_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-Stop__departureTrack`;
const DEPARTURE_TIME_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-Stop__departureTime`;
const PRICE_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-headerPrice__amount`;
const PRICE_LABEL_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-headerPrice__label`;

module.exports = TravelDetailsPageObject;

/**
 * The travel details page object.
 *
 * For now we have the below methods, but it can easily be extended
 */
function TravelDetailsPageObject() {
    /**
     * Get travel details container
     *
     * @return {Promise<ElementFinder>}
     */
    this.getTravelDetailsContainer = () => $(TRAVEL_DETAILS_CONTAINER);

    /**
     * Get the departure time text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getDepartureTime = () => $(DEPARTURE_TIME_SELECTOR).getText().then((text) => text.trim());

    /**
     * Get the departure platform text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getDeparturePlatform = () => $(DEPARTURE_PLATFORM_SELECTOR).getText().then((text) => text.trim());

    /**
     * Get the journey details container
     *
     * @return {Promise<ElementFinder>}
     */
    this.getJourney = () => $(JOURNEY_SELECTOR);

    /**
     * Open the journey details container
     *
     * @return {Promise<void>}
     */
    this.openJourney = () => $(OPEN_JOURNEY_SELECTOR).click();

    /**
     * Get the price text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getPrice = () => $(PRICE_SELECTOR).getText().then((text) => text.trim());

    /**
     * Get the price label text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getPriceLabel = () => $(PRICE_LABEL_SELECTOR).getText().then((text) => text.trim());
}