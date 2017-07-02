'use strict';
const locations = require('./ui/locations.page');
const travelDetails = require('./ui/travel-details.page');

/**
 * A plan journey task that plans the journey based on the provided properties
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
module.exports = function planJourney(journeyActions){
    // All actions are promises, so push them in a promise container
    let promises = [];

    if (journeyActions.from){
        promises.push(locations.departure().setValue(journeyActions.from));
    }

    if (journeyActions.to){
        promises.push(locations.arrival().setValue(journeyActions.to));
    }

    if (journeyActions.on){
        promises.push(travelDetails.setDate(journeyActions.on));
    }

    if (journeyActions.at){
        promises.push(travelDetails.setTime(journeyActions.at));
    }

    promises.push(travelDetails.submit());

    // Resolve all promises
    return Promise.all(promises);
};