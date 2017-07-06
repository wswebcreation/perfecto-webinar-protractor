'use strict';

const DEPARTURE_PLATFORM_SELECTOR = '.rp-Stop__departureTrack';
const PRICE_SELECTOR = '.rp-headerPrice__amount';
const PRICE_LABEL_SELECTOR = '.rp-headerPrice__label';

module.exports = TravelDetailsPageObject;

/**
 * The travel details page object.
 *
 * For now we have the below methods, but it can easily be extended
 */
function TravelDetailsPageObject() {
    /**
     * Get the departure platform text, it will return a promise that resolves in a trimmed string
     *
     * @return {Promise<string>} Returns a trimmed string
     */
    this.getDeparturePlatform = () => $(DEPARTURE_PLATFORM_SELECTOR).getText().then((text) => text.trim());

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