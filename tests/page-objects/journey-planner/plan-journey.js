'use strict';
const Locations = require('./ui/locations.page');
const TravelDetails = require('./ui/travel-details.page');

module.exports = function planJourneyTasks() {
    const locations = new Locations();
    const travelDetails = new TravelDetails();

    /**
     * Plan a journey based on the from, to, on and at values
     *
     * @example:
     * <pre>
     *      const journeyActions = {
     *          from: 'the from station',
     *          to: 'the to station'
     *          on: 'the date {04 July}',
     *          at: 'the time {21:00}'
     *      }
     * </pre>
     */
    this.fromToOnDateAndTime = (journeyActions) => {
        // All actions are promises, so push them in a promise container
        let promises = [];

        if (journeyActions.from) {
            promises.push(locations.departureStationField().setValue(journeyActions.from));
        }

        if (journeyActions.to) {
            promises.push(locations.arrivalStationField().setValue(journeyActions.to));
        }

        if (journeyActions.on) {
            promises.push(travelDetails.setDate(journeyActions.on));
        }

        if (journeyActions.at) {
            promises.push(travelDetails.setTime(journeyActions.at));
        }

        promises.push(travelDetails.submit());

        // Resolve all promises
        return Promise.all(promises);
    }
};