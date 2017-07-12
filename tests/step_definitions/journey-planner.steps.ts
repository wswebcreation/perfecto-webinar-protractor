import { expect } from '../../config-helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';
import {
    acceptCookies,
    disablePossibilityHover,
    lockHeader,
    scrollElementIntoView
} from '../helpers/helpers';
import { PlanJourneyTasks } from '../page-objects/journey-planner/plan-journey';
import { TravelDetailsPageObject } from '../page-objects/travel-advice/ui/travel-details.page';
import { PossibilitiesPageObject } from '../page-objects/travel-advice/ui/travel-possibilities.page';
import { ActionType, SelectedDepartureTimePlatformPriceTravelClassInterface, TravelAdviceTasks } from '../page-objects/travel-advice/travel-advice';

defineSupportCode(({Given, When, Then}) => {
    const journey: PlanJourneyTasks = new PlanJourneyTasks();
    const travelAdvice = new TravelAdviceTasks();
    const travelDetails = new TravelDetailsPageObject();
    const travelPossibilities = new PossibilitiesPageObject();

    Given('{someone} opens the journey planner from the NS', async (someone: string): Promise<void> => {
        await browser.get('en/journeyplanner/#/');
        await acceptCookies();
        await lockHeader();
    });

    When('he plans a journey from {fromStation} to {toStation} on {date} at {time}',
        async (fromStation: string,
               toStation: string,
               date: string,
               time: string) => {

            await journey.plan({
                from: fromStation,
                to: toStation,
                on: date,
                at: time
            });
        });

    When('he want\'s to see which journeys are earlier and later', async (): Promise<void> => {
        await travelAdvice.selectEarlierLaterTravels([ActionType.EARLIER, ActionType.LATER]);
    });

    Then('he should see the trains departing at {suggestedTimes}', async (suggestedTimes): Promise<void> => {
        await expect(travelAdvice.getSuggestedTravelTimes()).to.eventually.equal(suggestedTimes);
    });

    Then('he should see the preselected journey will leave at {departureTime} from platform {platform} and costs € {amount} for a single way {travelClass} class ticket',
        async (departureTime: string,
               platform: string,
               amount: string,
               travelClass: string): Promise<void> => {

            const selectedDepartureTimePlatformPriceTravelClass: SelectedDepartureTimePlatformPriceTravelClassInterface = await travelAdvice.getSelectedDepartureTimePlatformPriceTravelClass();

            expect(selectedDepartureTimePlatformPriceTravelClass.departureTime).to.equal(departureTime);
            expect(selectedDepartureTimePlatformPriceTravelClass.departurePlatform).to.contains(platform);
            expect(selectedDepartureTimePlatformPriceTravelClass.price).to.contains(amount);
            await expect(selectedDepartureTimePlatformPriceTravelClass.travelClass).to.contains(travelClass);
        });

    Then('he can verify the {screenshotType} result with a baseline', async (screenshotType: string): Promise<void> => {
        if (screenshotType === 'travel details') {
            // The behaviour on mobile is different. We first need to open the travel before we can see the details
            if (browser.deviceProperties.deviceType === 'mob') {
                await travelPossibilities.getSelectedPossibility().open();
            }

            // First always scroll the element into the view, if not then it will fail
            await scrollElementIntoView(travelDetails.getTravelDetailsContainer());

            // Just call the check method, add an element and a name of the screenshot and compare the result
            await expect(
                browser.protractorImageComparison.checkElement(travelDetails.getTravelDetailsContainer(), 'travelDetails')
            ).to.eventually.equal(0);

        } else if (screenshotType === 'fullpage screenshot') {
            // This is extra for the full page screenshot, but only needed in this specific case
            await disablePossibilityHover();

            // Just call the check method, add a name how you want the screenshot to be named and compare the result
            await expect(
                browser.protractorImageComparison.checkFullPageScreen('fullpage', {ignoreAntialiasing: true})
            ).to.eventually.equal(0);
        }

        await Promise.resolve();
    });
});