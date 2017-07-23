import { $, ElementFinder } from 'protractor';

const TRAVEL_DETAILS_CONTAINER = '.rp-reisdetails';
const JOURNEY_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-reisdetails__journey`;
const OPEN_JOURNEY_SELECTOR = `${JOURNEY_SELECTOR} .rp-Traject__description`;
const DEPARTURE_PLATFORM_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-Stop__departureTrack`;
const DEPARTURE_TIME_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-Stop__departureTime`;
const PRICE_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-headerPrice__amount`;
const PRICE_LABEL_SELECTOR = `${TRAVEL_DETAILS_CONTAINER} .rp-headerPrice__label`;

/**
 * The travel details page object.
 *
 * For now we have the below methods, but it can easily be extended
 */
export class TravelDetailsPageObject {
    public getTravelDetailsContainer(): ElementFinder {
        return $(TRAVEL_DETAILS_CONTAINER);
    }

    public async getDepartureTime(): Promise<string> {
        return (await $(DEPARTURE_TIME_SELECTOR).getText()).trim();
    }

    public async getDeparturePlatform(): Promise<string> {
        return (await $(DEPARTURE_PLATFORM_SELECTOR).getText()).trim();
    }

    public getJourney(): ElementFinder {
        return $(JOURNEY_SELECTOR);
    }

    public async openJourney(): Promise<void> {
        return $(OPEN_JOURNEY_SELECTOR).click();
    }

    public async getPrice(): Promise<string> {
        return (await $(PRICE_SELECTOR).getText()).trim();
    }

    public async getPriceLabel(): Promise<string> {
        return (await $(PRICE_LABEL_SELECTOR).getText()).trim();
    }
}