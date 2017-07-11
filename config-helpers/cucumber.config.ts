// See https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/timeouts.md
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';

defineSupportCode(({setDefaultTimeout}) => {
    setDefaultTimeout(browser.allScriptsTimeout);
});