const path = require('path');
const chai = require('chai');
const perfectoConfig = require('./perfecto.config.json');
const Reporting = require('perfecto-reporting');
chai.use(require('chai-as-promised'));

exports.config = {
    /**
     * Protractor specific
     */
    allScriptsTimeout: 60000,
    baseUrl: 'http://www.ns.nl/',
    disableChecks: true,
    maxSessions: 10,

    /**
     * Perfecto specific
     */
    seleniumAddress: perfectoConfig.seleniumAddress,
    multiCapabilities: [
        {
            browserName: 'Chrome',
            browserVersion: '59',
            location: 'US East',
            platformName: 'Windows',
            platformVersion: '10',
            resolution: '1440x900',
            password: perfectoConfig.password,
            user: perfectoConfig.user,
            // Custom
            deviceProperties: {
                environment: 'perfecto'
            }
        }
    ],

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
     * CucumberJS + Protractor + Perfecto preparation
     */
    onPrepare: () => {
        // Add the expect for CucumberJS, because it has no default assertion library
        global.expect = chai.expect;

        // Add the Perfecto reporting
        browser.reportingClient = new Reporting.Perfecto.PerfectoReportingClient(
            new Reporting.Perfecto.PerfectoExecutionContext({
                webdriver: browser.driver,
                tags: []
            }));

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