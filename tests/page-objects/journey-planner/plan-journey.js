'use strict';
const JourneyPlanDetails = require('./ui/journey-plan-details.page');

module.exports = function planJourneyTasks() {
    const journey = new JourneyPlanDetails();

    /**
     * Plan a journey based on the from, to, on and at values
     *
     * @example:
     * <pre>
     *      const journeyData = {
     *          from: 'the from station',
     *          to: 'the to station'
     *          on: 'the date {04 July}',
     *          at: 'the time {21:00}'
     *      }
     * </pre>
     */
    this.plan = (journeyData) => {
        // All actions are promises, so push them in a promise container
        let promises = [];

        if (journeyData.from) {
            promises.push(journey.departureStation().setValue(journeyData.from));
        }

        if (journeyData.to) {
            promises.push(journey.arrivalStation().setValue(journeyData.to));
        }

        if (journeyData.on) {
            promises.push(journey.setDate(journeyData.on));
        }

        if (journeyData.at) {
            promises.push(journey.setTime(journeyData.at));
        }

        promises.push(journey.submitJourney());

        // Resolve all promises
        return Promise.all(promises);
    }
};