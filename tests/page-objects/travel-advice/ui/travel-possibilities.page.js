'use strict';

const PossibilityPageObject = require('./travel-possibility.page');

const EARLIER_SELECTOR = '.rp-navbarButton--earlier';
const LATER_SELECTOR = '.rp-navbarButton--later';
const POSSIBILITY_SELECTOR = 'mogelijkheid';
const SELECTED_POSSIBILITY_SELECTOR = `${POSSIBILITY_SELECTOR} .rp-mogelijkheid--selected`;

module.exports = PossibilitiesPageObject;

/**
 * The travel possibilities page object.
 */
function PossibilitiesPageObject() {
    /**
     * Get earlier button, by clicking on it earlier possibilities are loaded
     *
     * @return {ElementFinder}
     */
    this.getEarlierPossibilities = () => $(EARLIER_SELECTOR);

    /**
     * Get all the possibilities
     *
     * @return {ElementArrayFinder} all the possibilities
     */
    this.getAllPossibilities = () => $$(POSSIBILITY_SELECTOR);

    /**
     * Get the page component of the selected possibility. The methods like `getArrivalTime(), getDepartureTime,..` can be used now
     *
     * @return {PossibilityPageObject}
     */
    this.getSelectedPossibility = () => new PossibilityPageObject($(SELECTED_POSSIBILITY_SELECTOR));

    /**
     * Get later button, by clicking on it later possibilities are loaded
     *
     * @return {ElementFinder}
     */
    this.getLaterPossibilities = () => $(LATER_SELECTOR);
}