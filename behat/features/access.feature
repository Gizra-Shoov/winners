Feature: Access to admin
  In order to be able to view the site backoffice
  As an registered user
  We need to be able to have access to the admin page

  @api
  Scenario: Open homepage and access to the admin
    Given I visit the homepage
    When  I login with user "david" password "1234"
    Then  I should have access to the page
