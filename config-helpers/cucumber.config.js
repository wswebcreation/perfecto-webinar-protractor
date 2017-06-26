// See https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/timeouts.md
const {defineSupportCode} = require('cucumber');

defineSupportCode(({setDefaultTimeout}) => {
    setDefaultTimeout(browser.allScriptsTimeout);
});