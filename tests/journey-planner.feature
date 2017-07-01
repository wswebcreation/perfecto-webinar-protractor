@journey-planner
Feature: NS Journey planner

    As a traveler,
    I’d like to know the fastest route between two stations,
    So that I get to my destination as quickly as possible

    @next-train
    Scenario: Eran looks for the next train
        Given Eran opens the journey planner from the NS
        When he plans a journey from Amsterdam Airport to Utrecht Centraal on 28 July at 21:00
        Then he should see the trains departing at 20:48, 21:00, 21:18, 21:48, 22:18

    @verify-details
    Scenario: Eran verifies his preselected train details
        Given Eran opens the journey planner from the NS
        When he plans a journey from Amsterdam Airport to Utrecht Centraal on 28 July at 17:00
        Then he should see the preselected journey will leave at 17:00 from platform 3 and costs € 8.70 for a single way 2nd class ticket
