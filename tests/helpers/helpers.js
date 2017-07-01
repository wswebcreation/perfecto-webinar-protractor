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
        if (browser.browserName.toLowerCase() === 'safari') {
            return browser.actions().mouseMove({x: 493, y: 333}).mouseDown().mouseUp().perform();
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
