'use strict';

const {defineSupportCode} = require('cucumber');
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
    function _generateAndSaveJsonFile() {
        jsonFormatter.log = function (report) {
            return browser.getCapabilities()
                .then((capabilities) => _adjustAndSaveJsonFile(capabilities, report));
        };
    }

    /**
     * Adjust and save the json files
     */
    function _adjustAndSaveJsonFile(capabilities, report) {
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
            const filePath = path.join(snapshotPath, `${featureName}.${browserName.toLowerCase()}_${Date.now()}.json`);

            jsonReport[0].metadata = metadata;

            fs.ensureDirSync(snapshotPath);
            jsonFile.writeFileSync(filePath, jsonReport, {spaces: 2});
        }
    }
});
