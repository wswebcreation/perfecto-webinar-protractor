import { JourneyPlanDetails } from './ui/journey-plan-details.page';

export interface JourneyData {
    from?: string;
    to?: string;
    on?: string; // {04 July}
    at?: string; // {21:00}
}

export class PlanJourneyTasks {
    public async plan(journeyData: JourneyData): Promise<void> {
        const journey = new JourneyPlanDetails();

        if (journeyData.from) {
            await journey.departureStation.setValue(journeyData.from);
        }

        if (journeyData.to) {
            await journey.arrivalStation.setValue(journeyData.to);
        }

        if (journeyData.on) {
            await journey.setDate(journeyData.on);
        }

        if (journeyData.at) {
            await journey.setTime(journeyData.at);
        }

        return journey.submitJourney();
    }
}