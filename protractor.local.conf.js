const path = require('path');
const chai = require('chai');
const fs = require('fs-extra');
chai.use(require('chai-as-promised'));

exports.config = {
    /**
     * Protractor specific
     */
    allScriptsTimeout: 25000,
    baseUrl: 'http://www.ns.nl/',
    disableChecks: true,
    maxSessions: 10,

    /**
     * Local specific
     */
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        },
        // Custom
        deviceProperties: {
            environment: 'local'
        }
    },

    /**
     * CucumberJS specific
     */
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        path.resolve(process.cwd(), './tests/**/*.feature')
    ],
    cucumberOpts: {
        require: [
            path.resolve(process.cwd(), './config-helpers/*.js'),
            path.resolve(process.cwd(), './tests/**/*.steps.js'),
        ],
        format: 'pretty',
        tags: ''
    },

    // Allows cucumber to handle the 199 exception and record it appropriately
    ignoreUncaughtExceptions: true,

    /**
     * Empty local folders before all tests are started
     */
    beforeLaunch: () => {
        console.log(`\n===========================================================================`);
        console.log(`\n  The directory './tmp', which holds failed screenshots is being removed.\n`);
        console.log(`===========================================================================\n`);
        fs.removeSync('./.tmp');
    },

    /**
     * CucumberJS + Protractor + Perfecto preparation
     */
    onPrepare: () => {
        // Add the expect for CucumberJS, because it has no default assertion library
        global.expect = chai.expect;

        /**
         * - get the capabilities of each driver
         * - set the screensize
         */
        return browser.getProcessedConfig()
            .then((processedConfig) => {
                browser.browserName = processedConfig.capabilities.browserName;
                browser.deviceProperties = processedConfig.capabilities.deviceProperties;
                return browser.driver.manage().window().setSize(1366, 768);
            });
    }
};