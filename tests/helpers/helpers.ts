import { $, browser, ElementFinder } from 'protractor';

/**
 * Accept the cookies if the cookie iframe is present
 */
export async function acceptCookies(): Promise<void> {
    await browser.sleep(500);
    return (await $('iframe').isPresent()) ? _clickOnAccept() : Promise.resolve();
}

/**
 * Disable the possibility hover, this makes the fullpage image look bad
 */
export async function disablePossibilityHover(): Promise<void> {
    return browser.executeScript<void>(_disablePossibilityHover);
}

/**
 * Lock the header so it won't stay at the top when scrolled
 */
export async function lockHeader(): Promise<void> {
    return browser.executeScript<void>(_lockHeader);
}

/**
 * Scroll an element into view
 */
export async function scrollElementIntoView(element: ElementFinder): Promise<void> {
    return browser.executeScript<void>('arguments[0].scrollIntoView();', element.getWebElement());
}

/*******************
 * PRIVATE METHODS *
 *******************/

/**
 * Accept the cookies in the iframe
 */
async function _clickOnAccept(): Promise<void> {
    if (browser.deviceProperties.environment === 'perfecto') {
        try {
            await browser.driver.executeScript<void>('mobile:button-text:click', {
                'label': 'Accepteer cookies',
                'ignorecase': 'case',
                'match': 'last'
            });
        } catch (error) {
            return Promise.resolve();
        }
    } else {

        await browser.switchTo().frame(0);
        browser.waitForAngularEnabled(false);

        try {
            await $('.accept').click();
            browser.waitForAngularEnabled(true);
            await browser.driver.switchTo().defaultContent();
        } catch (error) {
            browser.waitForAngularEnabled(true);
            await browser.driver.switchTo().defaultContent();
        }
    }
}

/**
 * Disable the hover effect on the possibility
 * @private
 */
function _disablePossibilityHover(): void {
    const css = '.rp-mogelijkheid:hover .rp-mogelijkheid__background {' +
        'top: 0 !important;' +
        'right: 0 !important;' +
        'bottom: 0 !important;' +
        'left: 0 !important;' +
        'box-shadow: 0 0.125rem 0 0 rgba(7,7,33,.15) !important;' +
        '}';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

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
    (document.querySelector('header.header') as HTMLElement).style.position = 'inherit';
}
