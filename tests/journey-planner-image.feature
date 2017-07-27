@image-comparison
Feature: NS Journey planner visual validation

    As a developer,
    I’d like to know if I implemented the designs as given,
    So that I can make my designers proud

    @desktop
    Scenario: Wim validates his preselected travel details
        Given Wim opens the journey planner from the NS
        When he plans a journey from Amsterdam Airport to Utrecht Centraal on 28 July at 17:00
        Then he can verify the travel details result with a baseline

    @mobile
    Scenario: Wim validates his train details on a full page
        Given Wim opens the journey planner from the NS
        When he plans a journey from Amsterdam Airport to Utrecht Centraal on 28 July at 17:00
        And he want's to see which journeys are earlier and later
        Then he can verify the fullpage screenshot result with a baseline