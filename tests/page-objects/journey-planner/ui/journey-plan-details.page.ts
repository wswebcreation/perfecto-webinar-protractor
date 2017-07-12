import { $ } from 'protractor';
import { DatepickerPageComponent } from './datepicker.page';
import { InputTextPageComponent } from './input-text.page';
import { TimePickerPageComponent } from './timepicker.page';

const ARRIVAL_STATION_SELECTOR = '#location_input_arrival';
const DEPARTURE_STATION_SELECTOR = '#location_input_departure';
const SUBMIT_SELECTOR = '.rp-Reisplanbalk__submit';

export class JourneyPlanDetails {
    public get departureStation(): InputTextPageComponent {
        return new InputTextPageComponent($(DEPARTURE_STATION_SELECTOR));
    }

    public get arrivalStation(): InputTextPageComponent {
        return new InputTextPageComponent($(ARRIVAL_STATION_SELECTOR));
    }

    public async setDate(date: string): Promise<void> {
        return new DatepickerPageComponent().setValue(date);
    }

    public async setTime(time: string): Promise<void> {
        return new TimePickerPageComponent().setValue(time);
    }

    public async submitJourney(): Promise<void> {
        return $(SUBMIT_SELECTOR).click();
    }
}