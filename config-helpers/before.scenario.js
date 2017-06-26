// See event handlers https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/event_handlers.md
const {defineSupportCode} = require('cucumber');

defineSupportCode(({registerHandler}) => {
    const isPerfecto = browser.deviceProperties.environment === 'perfecto';

    registerHandler('BeforeFeature', (feature, callback) => {
        if (isPerfecto) {
            browser.currentFeature = feature.name;
        }
        callback();
    });

    registerHandler('BeforeScenario', (scenario, callback) => {
        if (isPerfecto) {
            const tags = [];
            const tagsObj = scenario.tags;

            for (let tag of tagsObj) {
                tags.push(tag.name);
            }

            // // Adding the current feature to reporting tags
            tags.push(browser.currentFeature);

            browser.reportingClient.testStart(scenario.name, tags);
        }
        callback();
    });

    registerHandler('BeforeStep', (step, callback) => {
        if (isPerfecto) {
            browser.reportingClient.stepStart(step.keyword + ' ' + step.name);
        }
        callback();
    });
});