import angular from 'angular';
import {modalModule} from 'common/components/modal';
import './builder.tpl';


export var builderModule = angular.module('admin.builder', [modalModule.name, 'app/admin/builder/builder.tpl.html']);

builderModule.controller('BuilderController', function(){
  console.log('builder!');
});
