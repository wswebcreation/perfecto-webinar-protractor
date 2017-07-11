const {defineSupportCode} = require('cucumber');
const helpers = require('../helpers/helpers');
const Journey = require('../page-objects/journey-planner/plan-journey');
const TravelAdvice = require('../page-objects/travel-advice/travel-advice');
const TravelDetails = require('../page-objects/travel-advice/ui/travel-details.page');

defineSupportCode(({Given, When, Then}) => {
    const journey = new Journey();
    const travelAdvice = new TravelAdvice();
    const travelDetails = new TravelDetails();

    Given('{someone} opens the journey planner from the NS', (someone) => {
        return browser.get('en/journeyplanner/#/')
            .then(() => helpers.acceptCookies())
            .then(() => helpers.lockHeader());
    });

    When('he plans a journey from {fromStation} to {toStation} on {date} at {time}', (fromStation, toStation, date, time) => {
        return journey.plan({
            from: fromStation,
            to: toStation,
            on: date,
            at: time
        });
    });

    When('he want\'s to see which journeys are earlier and later', () => {
        return travelAdvice.selectEarlierLaterTravels(['earlier', 'later']);
    });

    Then('he should see the trains departing at {suggestedTimes}', (suggestedTimes) => {
        return expect(travelAdvice.getSuggestedTravelTimes()).to.eventually.equal(suggestedTimes);
    });

    Then('he should see the preselected journey will leave at {departureTime} from platform {platform} and costs € {amount} for a single way {travelClass} class ticket',
        (departureTime, platform, amount, travelClass) => {
            return travelAdvice.getSelectedDepartureTimePlatformPriceTravelClass()
                .then((result) => {
                    expect(result.departureTime).to.equal(departureTime);
                    expect(result.departurePlatform).to.contains(platform);
                    expect(result.price).to.contains(amount);
                    return expect(result.travelClass).to.contains(travelClass);
                });
        });

    Then('he can verify the {screenshotType} result with a baseline', (screenshotType) => {
        if (screenshotType === 'travel details') {
            // First always scroll the element into the view, if not then it will fail
            helpers.scrollElementIntoView(travelDetails.getTravelDetailsContainer());

            // Just call the check method, add an element and a name of the screenshot and compare the result
            return expect(
                browser.protractorImageComparison.checkElement(travelDetails.getTravelDetailsContainer(), 'travelDetails')
            ).to.eventually.equal(0);

        } else if (screenshotType === 'fullpage screenshot') {
            // This is extra for the full page screenshot, but only needed in this specific case
            helpers.disablePossibilityHover();

            // Just call the check method, add a name how you want the screenshot to be named and compare the result
            return expect(
                browser.protractorImageComparison.checkFullPageScreen('fullpage')
            ).to.eventually.equal(0);
        }
    });
});