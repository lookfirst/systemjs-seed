`import appModule from 'appModule'`

appModule.config(($locationProvider, $httpProvider, $urlRouterProvider) ->
	$locationProvider.html5Mode(true)
	$httpProvider.useApplyAsync(true)
	$urlRouterProvider.otherwise('/todo')
)

angular.element(document).ready(->
	angular.bootstrap(document.body, [appModule.name], {
		strictDi: true
	})
)
