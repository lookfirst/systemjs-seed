import angular from 'angular';
import routing from 'common/utils/routing';

var appModule = angular.module('app', []);

appModule.config(routing(appModule));

appModule.config(function($locationProvider, $httpProvider, $urlRouterProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$httpProvider.useApplyAsync(true);
	return $urlRouterProvider.otherwise('/todo');
});

angular.element(document).ready(function() {
	return angular.bootstrap(document.body, [appModule.name], {
		strictDi: true
	});
});

export default appModule;
