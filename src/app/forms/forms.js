'use strict';

define(['angular', 'app/forms/forms.tpl', 'common/components/modal', 'common/components/select'],
	function(angular, formsTpl, modal, select) {
		var formModule = angular.module('forms', [formsTpl.name, modal.name, select.name]);

		formModule.config(function($stateProvider) {
			$stateProvider.state('forms', {
				url: '/forms',
				templateUrl: 'app/forms/forms.tpl.html',
				controller: 'FormsCtrl'
			});
		});

		formModule.controller('FormsCtrl', () => {
			console.log('forms!');
		});

		return formModule;
	}
);
