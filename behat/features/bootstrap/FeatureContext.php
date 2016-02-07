<?php

use Drupal\DrupalExtension\Context\MinkContext;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\Behat\Tester\Exception\PendingException;

class FeatureContext extends MinkContext implements SnippetAcceptingContext {

  /**
   * @Given I am an anonymous user
   */
  public function iAmAnAnonymousUser() {
    // Just let this pass-through.
  }

  /**
   * @When I visit the homepage
   */
  public function iVisitTheHomepage() {
    $this->getSession()->visit($this->locatePath('/'));
  }

  /**
   * @Then I should have access to the page
   */
  public function iShouldHaveAccessToThePage() {
    $this->assertSession()->statusCodeEquals('200');
  }

  /**
   * @Then I should not have access to the page
   */
  public function iShouldNotHaveAccessToThePage() {
    $this->assertSession()->statusCodeEquals('403');
  }

  /**
   * @Given I am admin
   */
  public function iAmAdmin() {
    $this->loginUser('admin', 'admin');
  }

  /**
   * @Given /^I click on the element with css "([^"]*)"$/
   */
  public function iClickOnTheElementWithCss($css_path) {
    if (!$element = $this->getSession()->getPage()->find('css', $css_path)) {
      throw new \Exception(sprintf('The element "%s" not found.', $css_path));
    }
    $element->click();
  }

  /**
   * Login a user to the site.
   *
   * @param $name
   *   The user name.
   * @param $password
   *   The use password.
   *
   * @throws \Behat\Mink\Exception\ElementNotFoundException
   * @throws \Exception
   */
  private function _login($name, $password) {
    $element = $this->getSession()->getPage();
    // Add username
    $username = $element->find('css', '#edit-name');
    $username->setValue($name);
    // Add password
    $password_element = $element->find('css', '#edit-pass');
    $password_element->setValue($password);
    // Click to submit the login form
    $this->iClickOnTheElementWithCss('#edit-submit');
  }

  /**
   * Login a user to the site.
   *
   * @param $name
   *   The user name.
   * @param $password
   *   The use password.
   *
   * @throws \Behat\Mink\Exception\ElementNotFoundException
   * @throws \Exception
   */
  protected function loginUser($name, $password) {
    $this->_login($name, $password);
  }

  /**
   * @Given I login with user :username password :password
   *
   * @param $username
   * @param $password
   */
  public function iLoginWithUserPassword($username, $password) {
    $this->loginUser($username, $password);
  }

  /**
   * @When I am visit :arg1
   */
  public function iAmVisit($url) {
    $this->getSession()->visit($url);
  }
}
