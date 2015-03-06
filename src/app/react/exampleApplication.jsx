import React from 'react';
import angular from 'angular';
import exampleTpl from 'app/react/example.tpl';
import appModule from 'app/app';

import 'app/react/example.css!';

var reactExample = angular.module('reactExample', ['react', appModule.name]);

// comment the export default line out to see error in ocLazyLoad:
export default reactExample;

//Potentially unhandled rejection [1] TypeError: Cannot read property 'files' of null
//at Object.g.provider.$get.load (http://localhost:9000/jspm_packages/npm/oclazyload@0.6.2/dist/ocLazyLoad.min.js:10:10451)
//at http://localhost:9000/common/utils/routing.js:35:17
//	at O (http://localhost:9000/jspm_packages/es6-module-loader.js:7:7439)
//at K (http://localhost:9000/jspm_packages/es6-module-loader.js:7:7071)
//at y.7.y.when (http://localhost:9000/jspm_packages/es6-module-loader.js:7:10745)
//at v.7.v.run (http://localhost:9000/jspm_packages/es6-module-loader.js:7:9781)
//at a.3.a._drain (http://localhost:9000/jspm_packages/es6-module-loader.js:7:1740)
//at 3.a.drain (http://localhost:9000/jspm_packages/es6-module-loader.js:7:1394)
//at MutationObserver.b (http://localhost:9000/jspm_packages/es6-module-loader.js:7:3302)es6-module-loader.src.js:140 (anonymous function)es6-module-loader.src.js:167 fes6-module-loader.src.js:189 i

reactExample.config(function($stateProvider) {
	$stateProvider
		.state('react', {
			url: '/react',
			templateUrl: exampleTpl.name,
			controller: 'ReactCtrl'
		})
});

reactExample.controller('ReactCtrl', function($scope) {
	$scope.person = {fname: 'Clark', lname: 'Kent'};
});

var Hello = React.createClass({
	propTypes: {
		fname: React.PropTypes.string.isRequired,
		lname: React.PropTypes.string.isRequired
	},

	render: function() {
		return <span>Hello {this.props.fname} {this.props.lname}</span>;
	}
});

reactExample.value('Hello', Hello);

reactExample.directive('hello', function(reactDirective) {
	return reactDirective(Hello);
});
