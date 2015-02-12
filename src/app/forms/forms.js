define(['angular', 'common/components/modal', './forms.tpl', 'common/components/select'], function(angular){

  var formModule = angular.module('forms', ['app/forms/forms.tpl.html', 'common.components.modal', 'common.components.select']);

  formModule.config(function($stateProvider){
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

});
