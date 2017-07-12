import { browser, ElementFinder } from 'protractor';
import { scrollElementIntoView } from '../../helpers/helpers';
import { TravelDetailsPageObject } from './ui/travel-details.page';
import { PossibilityPageObject } from './ui/travel-possibility.page';
import { PossibilitiesPageObject } from './ui/travel-possibilities.page';

export enum ActionType {
    EARLIER,
    LATER
}

export interface SelectedDepartureTimePlatformPriceTravelClassInterface {
    departureTime: string;
    departurePlatform: string;
    price: string;
    travelClass: string;
}

export class TravelAdviceTasks {
    private travelDetails: TravelDetailsPageObject;
    private travelPossibilities: PossibilitiesPageObject;

    constructor() {
        this.travelDetails = new TravelDetailsPageObject();
        this.travelPossibilities = new PossibilitiesPageObject();
    }

    public async getSuggestedTravelTimes(): Promise<string> {
        const suggestedDepartureTimes = await this.travelPossibilities.getAllPossibilities()
            .map((possibility: ElementFinder) => new PossibilityPageObject(possibility).getDepartureTime());

        return suggestedDepartureTimes.map((suggestedDepartureTime: string) => suggestedDepartureTime.trim()).join(', ');
    }

    public async getSelectedDepartureTimePlatformPriceTravelClass(): Promise<SelectedDepartureTimePlatformPriceTravelClassInterface> {
        if (browser.deviceProperties.deviceType === 'mob') {
            await this.travelPossibilities.getSelectedPossibility().open();
        }

        return {
            departureTime: await this.travelDetails.getDepartureTime(),
            departurePlatform: await this.travelDetails.getDeparturePlatform(),
            price: await this.travelDetails.getPrice(),
            travelClass: await this.travelDetails.getPriceLabel()
        };

    };

    public async selectEarlierLaterTravels(actions: ActionType[]): Promise<void> {
        for (let action of actions) {
            const element = action === ActionType.EARLIER ? 'getEarlierPossibilities' : 'getLaterPossibilities';
            await scrollElementIntoView(this.travelPossibilities[element]());
            await this.travelPossibilities[element]().click();
        }
    }
}
