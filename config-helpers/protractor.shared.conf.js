/**
 * This file will hold the default configuration that is used by all
 * protractor configuration files
 */
const argv = require('yargs').argv;
const fs = require('fs-extra');
const multipleCucumberHtmlReporter = require('multiple-cucumber-html-reporter');
const path = require('path');

exports.config = {
    /**
     * Protractor specific
     */
    allScriptsTimeout: 60000,
    baseUrl: 'http://www.ns.nl/',
    disableChecks: true,
    maxSessions: 10,

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
        tags: 'not @image-comparison'
    },

    // Allows cucumber to handle the 199 exception and record it appropriately
    ignoreUncaughtExceptions: true,

    /**
     * Empty the `./tmp` folder
     */
    beforeLaunch: () => {
        console.log(`\n==========================================================================`);
        console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);
        console.log(`==========================================================================\n`);
        fs.removeSync('./.tmp');
    },

    /**
     * Generate the custom reports when all is done
     */
    afterLaunch: function () {
        multipleCucumberHtmlReporter.generate({
            openReportInBrowser: argv.openReportInBrowser,
            jsonDir: '.tmp/json-output',
            reportPath: './.tmp/report/'
        });
    }
};