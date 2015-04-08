exports.config = {
	// The advantage of directly connecting to browser drivers is that your test scripts may start up and run faster.
	directConnect: true,

	// https://github.com/angular/protractor/blob/master/docs/jasmine-upgrade.md
	framework: 'jasmine2',

	// The address of a running selenium server.
	seleniumAddress: 'http://localhost:4444/wd/hub',

	// A base URL for your application under test. Calls to protractor.get()
	// with relative paths will be prepended with this.
	baseUrl: 'http://localhost:9000',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': ['no-sandbox']
		}
	},

	// Spec patterns are relative to the configuration file location passed
	// to proractor (in this example conf.js).
	// They may include glob patterns.
	specs: ['test-e2e-compile/**/*.js'],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		isVerbose: true,
		showTiming: true,
		includeStackTrace: true,
		showColors: true // Use colors in the command line report.
	}
};

if (process.env.TRAVIS) {
	exports.config.capabilities.chromeOptions.binary = __dirname + '/chrome-linux/chrome';
}
