import { PossibilityPageObject } from './travel-possibility.page';
import { $, $$, ElementArrayFinder, ElementFinder } from 'protractor';

const EARLIER_SELECTOR = '.rp-navbarButton--earlier';
const LATER_SELECTOR = '.rp-navbarButton--later';
const POSSIBILITY_SELECTOR = 'mogelijkheid';
const SELECTED_POSSIBILITY_SELECTOR = `${POSSIBILITY_SELECTOR} .rp-mogelijkheid--selected`;

/**
 * The travel possibilities page object.
 */
export class PossibilitiesPageObject {
    public getEarlierPossibilities(): ElementFinder {
        return $(EARLIER_SELECTOR);
    }

    public getAllPossibilities(): ElementArrayFinder {
        return $$(POSSIBILITY_SELECTOR);
    }

    public getSelectedPossibility(): PossibilityPageObject {
        return new PossibilityPageObject($(SELECTED_POSSIBILITY_SELECTOR));
    }

    public getLaterPossibilities(): ElementFinder {
        return $(LATER_SELECTOR);
    }
}