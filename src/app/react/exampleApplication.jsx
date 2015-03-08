import angular from 'angular';
import React from 'react';
import 'ngreact';

import exampleTpl from 'app/react/example.tpl';
import appModule from 'app/app';

import 'app/react/example.css!';

var reactExample = angular.module('reactExample', ['react', appModule.name, exampleTpl.name]);

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

export default reactExample;
