module.exports = helpers();

function helpers() {
    return {
        acceptCookies: acceptCookies,
        disablePossibilityHover: disablePossibilityHover,
        lockHeader: lockHeader,
        scrollElementIntoView: scrollElementIntoView
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
     * Disable the possibility hover, this makes the fullpage image look bad
     * @return { Promise<void> }
     */
    function disablePossibilityHover() {
        return browser.executeScript(_disablePossibilityHover);
    }

    /**
     * Lock the header so it won't stay at the top when scrolled
     * @return { Promise<void> }
     */
    function lockHeader() {
        return browser.executeScript(_lockHeader);
    }

    /**
     * Scroll an element into view
     * @param {ElementFinder} element the element that needs to be scrolled into the view
     * @return { Promise<void> }
     */
    function scrollElementIntoView(element) {
        return browser.driver.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
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

    /**
     * Disable the hover effect on the possibility
     * @private
     */
    function _disablePossibilityHover() {
        var css = '.rp-mogelijkheid:hover .rp-mogelijkheid__background {' +
                'top: 0 !important;' +
                'right: 0 !important;' +
                'bottom: 0 !important;' +
                'left: 0 !important;' +
                'box-shadow: 0 0.125rem 0 0 rgba(7,7,33,.15) !important;' +
                '}',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }

    /**
     * Add custom css to the page to prevent
     * @private
     */
    function _lockHeader() {
        document.querySelector('body').style.paddingTop = '0';
        document.querySelector('header.header').style.position = 'inherit';
    }
};
