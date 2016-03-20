'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');
var projectName = 'winners';

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    project: projectName,
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    project: projectName,
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
  'iphone5': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 5'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://winners-auctions.com';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .pause(2000)
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // Article.
            '#main-content img',
          ],
        remove:
          [
            // Carousel.
            '#md-slider-3-block img',
            '#md-slider-3-block .md-objects',
            // Article.
            '.textwidget p',
            '.textwidget h4',
            '.field-content a:first-child',
            '.region-live-message',
            // Facebook
            'footer #node-6511 p'
          ],
        hide:
          [
            '.footer h2'
          ],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the about page',function(done) {
    client
      .url(baseUrl + '/אודות')
      .webdrivercss(testName + '.about', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the archive-sales page',function(done) {
    client
      .url(baseUrl + '/ארכיון-מכירות')
      .webdrivercss(testName + '.archive-sales', {
        name: '1',
        exclude:
          [
            // Product.
            '.view-sales-archive img',
          ],
        remove:
          [
            // Product.
            '.view-sales-archive .views-field-title-field',
            '.view-sales-archive .views-field-field-live-auction-date',
            '.view-sales-archive .views-field-field-subtitle',
            '.view-sales-archive .sale-files',
          ],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the contact page',function(done) {
    client
      .url(baseUrl + '/צור-קשר')
      .webdrivercss(testName + '.contact', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
});
