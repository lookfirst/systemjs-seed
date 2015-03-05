`import angular from 'angular'`
`import routing from 'common/utils/routing'`

appModule = angular.module('app', [])

appModule.config(routing(appModule));

appModule.config(($locationProvider, $httpProvider, $urlRouterProvider) ->
	$locationProvider.html5Mode({enabled: true, requireBase: false})
	$httpProvider.useApplyAsync(true)
	$urlRouterProvider.otherwise('/todo')
)

angular.element(document).ready(->
	angular.bootstrap(document.body, [appModule.name], {
		strictDi: true
	})
)

`export default appModule`
