/**
 * Require the default config
 */
const config = require('./config-helpers/protractor.shared.conf').config;
const perfectoConfig = require('./perfecto.config.json');
const Reporting = require('perfecto-reporting');
const chai = require('chai');
const protractorImageComparison = require('protractor-image-comparison');

chai.use(require('chai-as-promised'));


/**
 * Perfecto specific
 */
config.seleniumAddress = perfectoConfig.seleniumAddress;
config.multiCapabilities = [
    {
        browserName: 'Chrome',
        browserVersion: '59',
        chromeOptions: {
            args: ['disable-infobars']
        },
        location: 'EU Frankfurt',
        platformName: 'Windows',
        platformVersion: '10',
        resolution: '1440x900',
        password: perfectoConfig.password,
        user: perfectoConfig.user,
        // Custom
        deviceProperties: {
            browser: {
                name: 'chrome',
                version: '59'
            },
            device: 'Virtual Machine',
            deviceType: 'desk',
            environment: 'perfecto',
            platform: {
                name: 'Windows',
                version: '10'
            }
        }
    },
    {
        browserName: 'Safari',
        browserVersion: '10',
        location: 'NA-US-BOS',
        platformName: 'Mac',
        platformVersion: 'macOS Sierra',
        resolution: '1440x900',
        password: perfectoConfig.password,
        user: perfectoConfig.user,
        // Custom
        deviceProperties: {
            browser: {
                name: 'safari',
                version: '10'
            },
            device: 'Mac Mini',
            deviceType: 'desk',
            environment: 'perfecto',
            platform: {
                name: 'OSX',
                version: '10.12.5'
            }
        }
    },
    {
        browserName: 'Safari',
        browserVersion: '10.2.1',
        location: 'NA-US-BOS',
        model: 'iPhone-7 Plus',
        platformName: 'iOS',
        platformVersion: '10.2.1',
        password: perfectoConfig.password,
        user: perfectoConfig.user,
        // Custom
        deviceProperties: {
            browser: {
                name: 'safari',
                version: '10'
            },
            device: 'Apple iPhone 7 Plus',
            deviceType: 'mob',
            environment: 'perfecto',
            platform: {
                name: 'iOS',
                version: '10.2.1'
            }
        }
    }
];

/**
 * CucumberJS + Protractor + Perfecto preparation
 */
config.onPrepare = () => {
    // Add the expect for CucumberJS, because it has no default assertion library
    global.expect = chai.expect;

    // Add the Perfecto reporting
    browser.reportingClient = new Reporting.Perfecto.PerfectoReportingClient(
        new Reporting.Perfecto.PerfectoExecutionContext({
            webdriver: browser.driver,
            tags: []
        }));

    // For image comparison
    browser.protractorImageComparison = new protractorImageComparison(
        {
            autoSaveBaseline: false,
            baselineFolder: 'imageComparison/baseline',
            screenshotPath: 'imageComparison/actualScreenshots'
        }
    );

    /**
     * - get the capabilities of each driver
     * - set the screensize
     */
    return browser.getProcessedConfig()
        .then((processedConfig) => {
            browser.browserName = processedConfig.capabilities.browserName;
            browser.deviceProperties = processedConfig.capabilities.deviceProperties;
            if(browser.deviceProperties.deviceType === 'desk'){
                return browser.driver.manage().window().setSize(1366, 768);
            } else{
                return Promise.resolve();
            }
        });
};

exports.config = config;