/**
 * Require the default config
 */
const config = require('./config-helpers/protractor.shared.conf').config;
const chai = require('chai');

chai.use(require('chai-as-promised'));

/**
 * Local specific
 */
config.capabilities = {
    browserName: 'chrome',
    chromeOptions: {
        args: ['disable-infobars']
    },
    // Custom
    deviceProperties: {
        browser: {
            name: 'chrome',
            version: 'latest'
        },
        device: 'Local development machine',
        deviceType: 'desk',
        environment: 'local',
        platform: {
            name: 'OSX',
            version: '10.12.5'
        }
    }
};

/**
 * CucumberJS + Protractor + local preparation
 */
config.onPrepare = () => {
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
};

exports.config = config;