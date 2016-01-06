Feature: Homepage
  In order to be able to view and get info about the site
  As an anonymous user
  We need to be able to have access to the homepage

  @api
  Scenario: Visit the homepage
    Given I am an anonymous user
    When  I visit the homepage
    Then  I should have access to the page

  @api
  Scenario: Open homepage for a david user
    Given I login with user
    When  I should see "ברוך הבא david"
    Then  I can logout
