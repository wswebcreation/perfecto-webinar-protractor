// See hooks https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md
// And https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/event_handlers.md
import { defineSupportCode, HookScenarioResult, Step } from 'cucumber';
import { resolve } from 'path';
import { browser } from 'protractor';
import { WriteStream, ensureDirSync, createWriteStream } from 'fs-extra';

// There is no @types/perfecto-reporting so we require it instead of import
const Reporting = require('perfecto-reporting');

interface World {
    attach: ((arg1: string | Buffer, arg2: string) => void);
}

defineSupportCode(({After, registerHandler}) => {
    const isPerfecto = browser.deviceProperties.environment === 'perfecto';

    /**
     * For the Perfecto report
     */
    registerHandler('AfterStep', (step: Step, callback: () => void): void => {
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
    After(async function (scenarioResult: HookScenarioResult): Promise<void> {
        const world: World = this; // tslint:disable-line

        // Remove the local storage
        await browser.driver.executeScript('localStorage.removeItem("location-arrival");localStorage.removeItem("location-departure");');

        if (scenarioResult.status === 'failed') {
            if (isPerfecto) {
                browser.reportingClient.testStop({
                    status: Reporting.Constants.results.failed,
                    message: JSON.stringify(scenarioResult.failureException)
                });
            }

            return saveFailedScenarioScreenshot(world, scenarioResult);
        } else {
            if (isPerfecto) {
                browser.reportingClient.testStop({
                    status: Reporting.Constants.results.passed
                });
            }

            return Promise.resolve();
        }
    });

    /**
     * Save a screenshot when a scenario failed
     */
    async function saveFailedScenarioScreenshot(world: World, scenarioResult: HookScenarioResult): Promise<void> {
        const screenshot = await browser.takeScreenshot();
        const fileName = `[${browser.browserName.toLowerCase()}]__${scenarioResult.scenario.name.toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
            .toLowerCase().substr(0, 100)}.png`;

        // Attach the screenshot to the Cucumber report
        world.attach(screenshot, 'image/png');

        return saveScreenshot(screenshot, fileName);
    }

    /**
     * Save a screenshot
     */
    function saveScreenshot(screenshot: string, fileName: string): void {
        const screenshotPath = resolve(process.cwd(), '.tmp/screenshots');
        const filepath = resolve(screenshotPath, fileName);

        let stream: WriteStream;

        ensureDirSync(screenshotPath);
        stream = createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
});