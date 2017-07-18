module.exports = helpers();

function helpers() {
    return {
        acceptCookies: acceptCookies
    };

    /**
     * Accept the cookies if the cookie iframe is present
     * @return { Promise<void> }
     */
    function acceptCookies() {
        return browser.sleep(500)
            .then(() => element(by.tagName('iframe')).isPresent())
            .then(isPresent => isPresent ? _clickOnAccept() : Promise.resolve());
    }

    /**
     * Accept the cookies in the iframe
     * @return { Promise<void> }
     * @private
     */
    function _clickOnAccept() {
        /**
         * This fails on Safari 10, the `switchTo()` doesn't seem to work good, non responsive hack for Safari
         */
        if (browser.deviceProperties.environment === 'perfecto') {
            return browser.driver.executeScript('mobile:button-text:click', {
                'label': 'Accepteer cookies',
                'ignorecase': 'case',
                'match': 'last'
            })
                .catch(() => Promise.resolve());
        }
        return browser.switchTo().frame(0)
            .then(() => {
                browser.ignoreSynchronization = true;
                return $('.accept').click();
            })
            .then(() => {
                browser.ignoreSynchronization = false;
                return browser.driver.switchTo().defaultContent();
            })
            // Extra fallback
            .catch(() => {
                browser.ignoreSynchronization = false;
                return browser.driver.switchTo().defaultContent();
            });
    }
};
