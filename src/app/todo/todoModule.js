import angular from 'angular';
import appModule from 'app/app';
import todoTpl from 'app/todo/todo.tpl';

export default angular.module('todomvc', [appModule.name, todoTpl.name]);
