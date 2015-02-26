`import angular from 'angular'`
`import 'angular-ui-router'`
`import 'ocLazyLoad'`
`import {routing} from 'common/utils/routing'`

module = angular.module('seed', ['ui.router', 'oc.lazyLoad'])

module.config(routing(module))

module.config(($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) ->
	$locationProvider.html5Mode(true)
	$httpProvider.useApplyAsync(true)
	$urlRouterProvider.otherwise('/login')
)

angular.element(document).ready(->
	angular.bootstrap(document.body, [module.name], {
		strictDi: true
	})
)
