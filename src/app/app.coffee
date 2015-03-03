`import angular from 'angular'`
`import routing from 'common/utils/routing'`

seed = angular.module('seed', [])
seed.config(routing(seed))

seed.config(($locationProvider, $httpProvider, $urlRouterProvider) ->
	$locationProvider.html5Mode(true)
	$httpProvider.useApplyAsync(true)
	$urlRouterProvider.otherwise('/todo')
)

angular.element(document).ready(->
	angular.bootstrap(document.body, [seed.name], {
		strictDi: true
	})
)
