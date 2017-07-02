const {defineSupportCode} = require('cucumber');
const helpers = require('../helpers/helpers');

const planJourney = require('../page-objects/journey-planner/planJourney');

defineSupportCode(({Given, When, Then}) => {
    Given('Eran opens the journey planner from the NS', () => {
        return browser.get('en/journeyplanner/#/')
            .then(() => helpers.acceptCookies());
    });

    When('he plans a journey from {fromStation} to {toStation} on {date} at {time}', (fromStation, toStation, date, time) => {
        return planJourney({
            from: fromStation,
            to: toStation,
            on: date,
            at: time
        });
    });

    Then('he should see the trains departing at {suggestedTimes}', (suggestedTimes) => {
        const actualLeaveTimes = [];

        return element.all(by.repeater('mogelijkheid in reisadviesCtrl.advies.reismogelijkheden track by mogelijkheid.hash'))
            .each((travelPossibility) => {
                return travelPossibility.element(by.css('.rp-mogelijkheidTijd.rp-vertrekTijd')).getText()
                    .then((departureTime) => {
                        actualLeaveTimes.push(departureTime.trim());
                    });
            })
            .then(() => {
                return expect(actualLeaveTimes.join(', ')).to.equal(suggestedTimes);
            });
    });

    Then('he should see the preselected journey will leave at {departureTime} from platform {platform} and costs € {amount} for a single way {travelClass} class ticket',
        (departureTime, platform, amount, travelClass) => {
            element.all(by.repeater('mogelijkheid in reisadviesCtrl.advies.reismogelijkheden track by mogelijkheid.hash'))
                .filter((travelPossibility) => {
                    return travelPossibility.element(by.tagName('a')).getAttribute('class')
                        .then((classes) => classes.indexOf('rp-mogelijkheid--selected') > -1);
                })
                .first().element(by.css('.rp-mogelijkheidTijd.rp-vertrekTijd')).getText()
                .then((text) => expect(text.trim()).to.equal(departureTime));

            element(by.css('.rp-reisadvies__main .rp-headerPrice__amount')).getText()
                .then((price) => expect(price.trim()).to.contains(amount));
            element(by.css('.rp-reisadvies__main .rp-Stop__departureTrack')).getText()
                .then((departureTrack) => expect(departureTrack.trim()).to.contains(platform));
            return element(by.css('.rp-reisadvies__main .rp-headerPrice__label')).getText()
                .then((priceClass) => expect(priceClass.trim()).to.contains(travelClass));
        });
});