`import angular from 'angular'`
`import './dashboards.tpl'`

dashboardModule = angular.module('dashboard', ['app/dashboard/dashboards.tpl.html'])

dashboardModule.config ($stateProvider) ->
  $stateProvider.state('dashboards', {
    url: '/dashboards',
    templateUrl: 'app/dashboard/dashboards.tpl.html',
    controller: 'DashboardCtrl'
  })

dashboardModule.controller 'DashboardCtrl', ($scope) ->
  console.log('dashboard!')

`export default dashboardModule`
