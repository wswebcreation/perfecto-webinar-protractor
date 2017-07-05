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

    this.getSuggestedTravelTimes = () => {
        const actualLeaveTimes = [];

        return travelPossibilities.getAllPossibilities()
            .each((possibility) => {
                return new TravelPossibility(possibility).getDepartureTime()
                    .then((departureTime) => {
                        actualLeaveTimes.push(departureTime.trim());
                    });
            })
            .then(() => actualLeaveTimes.join(', '));
    };

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