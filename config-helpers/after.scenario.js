// See hooks https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md
// and https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/event_handlers.md
const {defineSupportCode} = require('cucumber');
const path = require('path');
const fs = require('fs-extra');
const Reporting = require('perfecto-reporting');

defineSupportCode(({After, registerHandler}) => {
    const isPerfecto = browser.deviceProperties.environment === 'perfecto';

    /**
     * For the Perfecto report
     */
    registerHandler('AfterStep', (step, callback) => {
        if (isPerfecto) {
            browser.reportingClient.stepEnd(step.keyword + ' ' + step.name);
        }
        callback();
    });

    /**
     * Hook for:
     *  - cleaning the local storage in the journey planner
     *  - the screenshots when a scenario fails
     *  - update the Perfecto report on success / failure
     */
    After(function (scenarioResult) {
        const world = this;

        // Remove the local storage
        return browser.driver.executeScript('localStorage.removeItem("location-arrival");localStorage.removeItem("location-departure");')
        // save a screenshot if failed
            .then(() => {
                if (scenarioResult.status === 'failed') {
                    if (isPerfecto) {
                        browser.reportingClient.testStop({
                            status: Reporting.Constants.results.failed,
                            message: JSON.stringify(scenarioResult.scenario.failureException)
                        });
                    }

                    return saveFailedScenarioScreenshot(world, scenarioResult)
                } else {
                    if (isPerfecto) {
                        browser.reportingClient.testStop({
                            status: Reporting.Constants.results.passed
                        });
                    }

                    return Promise.resolve();
                }
            });
    });

    /**
     * Save a screenshot when a scenario failed
     */
    function saveFailedScenarioScreenshot(world, scenarioResult) {
        let screenshot;
        return browser.takeScreenshot()
            .then((result) => {
                screenshot = result;
                const fileName = `[${browser.browserName.toLowerCase()}]__${scenarioResult.scenario.name.toLowerCase()
                    .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
                    .toLowerCase().substr(0, 100)}.png`;

                world.attach(screenshot, 'image/png');

                return saveScreenshot(screenshot, fileName);
            });
    }

    /**
     * Save a screenshot
     */
    function saveScreenshot(screenshot, fileName) {
        const screenshotPath = path.resolve(process.cwd(), '.tmp/screenshots');
        const filepath = path.resolve(screenshotPath, fileName);

        let stream;

        fs.ensureDirSync(screenshotPath);
        stream = fs.createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
});