'use strict';

const PossibilityPageObject = require('./travel-possibility.page');

const EARLIER_SELECTOR = '.rp-navbarButton--earlier';
const LATER_SELECTOR = '.rp-navbarButton--later';
const POSSIBILITY_SELECTOR = 'mogelijkheid';
const SELECTED_POSSIBILITY_SELECTOR = `${POSSIBILITY_SELECTOR} .rp-mogelijkheid--selected`;

module.exports = PossibilitiesPageObject;

function PossibilitiesPageObject() {
    this.getEarlierPossibilities = () => $(EARLIER_SELECTOR);
    this.getAllPossibilities = () => $$(POSSIBILITY_SELECTOR);
    this.getSelectedPossibility = () => new PossibilityPageObject($(SELECTED_POSSIBILITY_SELECTOR));
    this.getLaterPossibilities = () => $(LATER_SELECTOR);
}