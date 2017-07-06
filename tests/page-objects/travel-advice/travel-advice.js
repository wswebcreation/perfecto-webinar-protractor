'use strict';
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

        return travelPossibilities.getSelectedPossibility().getDepartureTime()
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
};