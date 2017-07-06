'use strict';

/**
 * Input text page component
 *
 * @param {string | ElementFinder} selector Optional css selector or ElementFinder object
 *
 * usage:
 * - no param provided: returns an instance with the default selector
 * - css string provided as selector param: returns an instance with the provided selector
 * - an elementFinder object provided as selector param: returns an instance with the provided ElementFinder
 */
module.exports = function InputTextPageComponent(selector) {
    const inputSelector = selector || '[type="text"]';

    /**
     * Return the component so you can do all the protractor magic on it yourself
     *
     * @return {ElementFinder}
     */
    this.component = typeof selector === 'object' ? selector : $(inputSelector);

    /**
     * Method to check if it is disabled
     *
     * @return {Promise<boolean>}
     */
    this.isDisabled = () => this.component.getAttribute('disabled').then((value) => value === 'true');

    /**
     * Get the value of the input
     *
     * @return {Promise<string>}
     */
    this.getValue = () => this.component.getAttribute('value').then((value) => value || '');

    /**
     * Set the value of the component
     * @param {string} value the value that needs to be set
     *
     * @return {ElementFinder}
     */
    this.setValue = (value) => this.component.sendKeys(value);

    /**
     * Clear the input field
     *
     * @return {ElementFinder}
     */
    this.clearValue = () => this.component.clear();
};