'use strict';

const DEPARTURE_PLATFORM_SELECTOR = '.rp-Stop__departureTrack';
const PRICE_SELECTOR = '.rp-headerPrice__amount';
const PRICE_LABEL_SELECTOR = '.rp-headerPrice__label';

module.exports = TravelDetailsPageObject;

function TravelDetailsPageObject() {
    this.getDeparturePlatform = () => $(DEPARTURE_PLATFORM_SELECTOR).getText().then((text) => text.trim());
    this.getPrice = () => $(PRICE_SELECTOR).getText().then((text) => text.trim());
    this.getPriceLabel = () => $(PRICE_LABEL_SELECTOR).getText().then((text) => text.trim());
}