module.exports = helpers();

function helpers () {
    return {
        acceptCookies: acceptCookies
    };

    /**
     * Accept the cookies if the cookie iframe is present
     * @return { Promise<void> }
     */
    function acceptCookies() {
        return element(by.tagName('iframe')).isPresent()
            .then(isPresent => {
                return isPresent ? _clickOnAccept() : Promise.resolve();
            });
    }

    /**
     * Accept the cookies in the iframe
     * @return { Promise<void> }
     * @private
     */
    function _clickOnAccept() {
        return browser.switchTo().frame($('iframe').getWebElement())
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
