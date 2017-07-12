import { $, ElementFinder } from 'protractor';

const ARRIVAL_TIME_SELECTOR = '.rp-aankomstTijd';
const DEPARTURE_TIME_SELECTOR = '.rp-vertrekTijd';
const TRANSFERS_SELECTOR = '.rp-rp-mogelijkheid__transfer';
const TRAVEL_INFO_SELECTOR = '.rp-mogelijkheid__travelInfo modaliteit';
const TRAVEL_TIME_SELECTOR = '.rp-mogelijkheid__reistijd';

/**
 * The travel possibility page component.
 */
export class PossibilityPageObject {
    constructor(private elementFinder: ElementFinder) {

    }

    public async getArrivalTime(): Promise<string> {
        return (await this.elementFinder.$(ARRIVAL_TIME_SELECTOR).getText()).trim();
    }

    public async getDepartureTime(): Promise<string> {
        return (await this.elementFinder.$(DEPARTURE_TIME_SELECTOR).getText()).trim();
    }

    public async getTransfers(): Promise<string> {
        return (await this.elementFinder.$(TRANSFERS_SELECTOR).getText()).trim();
    }

    public async getTravelInfo(): Promise<string> {
        return (<any> await this.elementFinder.$$(TRAVEL_INFO_SELECTOR).getText()).join(', ');
    }

    public async getTravelTime(): Promise<string> {
        return (await this.elementFinder.$(TRAVEL_TIME_SELECTOR).getText()).trim();
    }

    public async open(): Promise<void> {
        await this.elementFinder.click();
    }
}