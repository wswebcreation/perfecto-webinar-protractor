// See event handlers https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/event_handlers.md
import { defineSupportCode, Feature, Scenario, Step } from 'cucumber';
import { browser } from 'protractor';

defineSupportCode(({registerHandler}) => {
    if (browser.deviceProperties.environment === 'perfecto') {
        registerHandler('BeforeFeature', (feature: Feature, callback: () => void): void => {
            browser.currentFeature = feature.name;
            callback();
        });

        registerHandler('BeforeScenario', (scenario: Scenario, callback) => {
            const tags = [];
            const tagsObj = scenario.tags;

            for (let tag of tagsObj) {
                tags.push(tag.name);
            }

            // // Adding the current feature to reporting tags
            tags.push(browser.currentFeature);

            browser.reportingClient.testStart(scenario.name, tags);
            callback();
        });

        registerHandler('BeforeStep', (step: Step, callback: () => void): void => {
            browser.reportingClient.stepStart(step.keyword + ' ' + step.name);
            callback();
        });
    }
});