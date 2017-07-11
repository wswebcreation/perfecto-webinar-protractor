'use strict';
const helpers = require('../../helpers/helpers');
const TravelDetails = require('./ui/travel-details.page');
const TravelPossibilities = require('./ui/travel-possibilities.page');
const TravelPossibility = require('./ui/travel-possibility.page');

/**
 * Return all the tasks for the journey advice
 */
module.exports = function travelAdvice() {
    const travelDetails = new TravelDetails();
    const travelPossibilities = new TravelPossibilities();

    /**
     * Get the suggested travel times
     *
     * @return {Promise<string>} like `20:48, 21:00, 21:18, 21:48, 22:18`
     */
    this.getSuggestedTravelTimes = () => {
        const suggestedTravelTimes = [];

        return travelPossibilities.getAllPossibilities()
            .each((possibility) => {
                return new TravelPossibility(possibility).getDepartureTime()
                    .then((suggestedDepartureTime) => {
                        suggestedTravelTimes.push(suggestedDepartureTime.trim());
                    });
            })
            .then(() => suggestedTravelTimes.join(', '));
    };

    /**
     * Get the selected departure time, platform, price and travel class
     *
     * @return {Promise<object>} When resolved it looks like
     *
     * @example
     * <pre>
     *  {
     *       departureTime: '17:00',
     *       departurePlatform: 'Platform 1',
     *       price: '€ 16.80',
     *       travelClass: 'Single way, 2nd class'
     *  }
     * </pre>
     */
    this.getSelectedDepartureTimePlatformPriceTravelClass = () => {
        const selectedDepartureTimePlatformPriceTravelClass = {
            departureTime: '',
            departurePlatform: '',
            price: '',
            travelClass: ''
        };

        if(browser.deviceProperties.deviceType === 'mob'){
            travelPossibilities.getSelectedPossibility().open();
        }

        return travelDetails.getDepartureTime()
            .then((departureTime) => {
                selectedDepartureTimePlatformPriceTravelClass.departureTime = departureTime;
                return travelDetails.getDeparturePlatform();
            })
            .then((departurePlatform) => {
                selectedDepartureTimePlatformPriceTravelClass.departurePlatform = departurePlatform;
                return travelDetails.getPrice();
            })
            .then((price) => {
                selectedDepartureTimePlatformPriceTravelClass.price = price;
                return travelDetails.getPriceLabel();
            })
            .then((priceLabel) => {
                selectedDepartureTimePlatformPriceTravelClass.travelClass = priceLabel;
                return selectedDepartureTimePlatformPriceTravelClass;
            });
    };

    /**
     * Select (multiple) earlier and or (multiple) later travels
     *
     * @param {Array} earlierLater An array that will hold 1 or multiple 'earlier', 'later'
     * @return {Promise<void>}
     *
     * @example
     * <pre>
     *  const selectEarlierLaterTravels(['earlier', 'earlier', 'later', 'earlier', 'later'])
     * </pre>
     */
    this.selectEarlierLaterTravels = (earlierLater) => {
        const clicksPromises = [];

        for (let click of earlierLater) {
            const element = click === ' earlier' ? 'getEarlierPossibilities': 'getLaterPossibilities';
            clicksPromises.push(helpers.scrollElementIntoView(travelPossibilities[element]()));
            clicksPromises.push(travelPossibilities[element]().click());
        }

        return Promise.all(clicksPromises);
    };
};