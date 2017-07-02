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
module.exports = function InputTextPageObject(selector) {
    const inputSelector = selector || '[type="text"]';

    this.component = typeof selector === 'object' ? selector : $(inputSelector);
    this.isDisabled = () => this.component.getAttribute('disabled').then((value) => value === 'true');
    this.getValue = () => this.component.getAttribute('value').then((value) => value || '');
    this.setValue = (value) => this.component.sendKeys(value);
    this.clearValue = () => this.component.clear();
};