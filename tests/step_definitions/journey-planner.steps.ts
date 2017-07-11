import { expect } from '../../config-helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';
import {
    acceptCookies,
    disablePossibilityHover,
    lockHeader,
    scrollElementIntoView
} from '../helpers/helpers';

const Journey = require('../page-objects/journey-planner/plan-journey');
const TravelAdvice = require('../page-objects/travel-advice/travel-advice');
const TravelPossibilities = require('../page-objects/travel-advice/ui/travel-possibilities.page');
const TravelDetails = require('../page-objects/travel-advice/ui/travel-details.page');

defineSupportCode(({Given, When, Then}) => {
    const journey = new Journey();
    const travelAdvice = new TravelAdvice();
    const travelDetails = new TravelDetails();
    const travelPossibilities = new TravelPossibilities();

    Given('{someone} opens the journey planner from the NS', async (someone: string) => {
        await browser.get('en/journeyplanner/#/');
        await acceptCookies();
        return lockHeader();
    });

    When('he plans a journey from {fromStation} to {toStation} on {date} at {time}',
        async (fromStation: string,
               toStation: string,
               date: string,
               time: string) => {
            return journey.plan({
                from: fromStation,
                to: toStation,
                on: date,
                at: time
            });
        });

    When('he want\'s to see which journeys are earlier and later', async () => {
        return travelAdvice.selectEarlierLaterTravels(['earlier', 'later']);
    });

    Then('he should see the trains departing at {suggestedTimes}', async (suggestedTimes) => {
        return expect(travelAdvice.getSuggestedTravelTimes()).to.eventually.equal(suggestedTimes);
    });

    Then('he should see the preselected journey will leave at {departureTime} from platform {platform} and costs € {amount} for a single way {travelClass} class ticket',
        async (departureTime: string,
               platform: string,
               amount: string,
               travelClass: string) => {

            const selectedDepartureTimePlatformPriceTravelClass = await travelAdvice.getSelectedDepartureTimePlatformPriceTravelClass();

            expect(selectedDepartureTimePlatformPriceTravelClass.departureTime).to.equal(departureTime);
            expect(selectedDepartureTimePlatformPriceTravelClass.departurePlatform).to.contains(platform);
            expect(selectedDepartureTimePlatformPriceTravelClass.price).to.contains(amount);
            return expect(selectedDepartureTimePlatformPriceTravelClass.travelClass).to.contains(travelClass);
        });

    Then('he can verify the {screenshotType} result with a baseline', async (screenshotType: string) => {
        if (screenshotType === 'travel details') {
            // The behaviour on mobile is different. We first need to open the travel before we can see the details
            if (browser.deviceProperties.deviceType === 'mob') {
                await travelPossibilities.getSelectedPossibility().open();
            }

            // First always scroll the element into the view, if not then it will fail
            await scrollElementIntoView(travelDetails.getTravelDetailsContainer());

            // Just call the check method, add an element and a name of the screenshot and compare the result
            return expect(
                browser.protractorImageComparison.checkElement(travelDetails.getTravelDetailsContainer(), 'travelDetails')
            ).to.eventually.equal(0);

        } else if (screenshotType === 'fullpage screenshot') {
            // This is extra for the full page screenshot, but only needed in this specific case
            await disablePossibilityHover();

            // Just call the check method, add a name how you want the screenshot to be named and compare the result
            return expect(
                browser.protractorImageComparison.checkFullPageScreen('fullpage', {ignoreAntialiasing: true})
            ).to.eventually.equal(0);
        }

        return Promise.resolve();
    });
});