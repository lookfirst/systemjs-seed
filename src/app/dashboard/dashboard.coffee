`import angular from 'angular'`
`import './dashboards.tpl'`
`import {selectModule} from 'common/components/select'`

dashboardModule = angular.module('dashboard', [selectModule.name, 'app/dashboard/dashboards.tpl.html'])

dashboardModule.config ($stateProvider) ->
  $stateProvider.state('dashboards', {
    url: '/dashboards',
    templateUrl: 'app/dashboard/dashboards.tpl.html',
    controller: 'DashboardCtrl'
  })

dashboardModule.controller 'DashboardCtrl', ->
  console.log('dashboard!')

`export default dashboardModule`
