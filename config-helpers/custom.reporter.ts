import { Capabilities } from 'selenium-webdriver';
import { browser } from 'protractor';
import { defineSupportCode } from 'cucumber';

const Cucumber = require('cucumber');
const jsonFormatter = new Cucumber.JsonFormatter();
const fs = require('fs-extra');
const jsonFile = require('jsonfile');
const path = require('path');
const projectRoot = process.cwd();

defineSupportCode(({registerListener}) => {
    registerListener(jsonFormatter);

    return _generateAndSaveJsonFile();

    /**
     * Generate and save the report json files
     */
    async function _generateAndSaveJsonFile(): Promise<void> {
        jsonFormatter.log = async function (report: string) {
            const capabilities = await browser.getCapabilities();
            await _adjustAndSaveJsonFile(capabilities, report);
        };
    }

    /**
     * Adjust and save the json files
     */
    function _adjustAndSaveJsonFile(capabilities: Capabilities, report: string) {
        const browserName = capabilities.get('browserName');
        const jsonReport = JSON.parse(report);

        if (jsonReport[0] != null) {
            const metadata = {
                'browser': {
                    'name': browser.deviceProperties.browser.name,
                    'version': browser.deviceProperties.browser.version
                },
                'device': browser.deviceProperties.device,
                'platform': {
                    'name': browser.deviceProperties.platform.name,
                    'version': browser.deviceProperties.platform.version
                }
            };
            const snapshotPath = path.join(projectRoot, '.tmp/json-output');
            const featureName = jsonReport[0].name.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase() || 'noName';
            const filePath = path.join(snapshotPath, `${featureName}.${browserName}_${Date.now()}.json`);

            jsonReport[0].metadata = metadata;

            fs.ensureDirSync(snapshotPath);
            jsonFile.writeFileSync(filePath, jsonReport, {spaces: 2});
        }
    }
});
