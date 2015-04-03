import angular from 'angular';
import appModule from 'app/app';
import todoTpl from 'app/todo/todo.tpl';

let todoModule = angular.module('todomvc', [appModule.name, todoTpl.name]);

todoModule.config(($stateProvider) => {

	$stateProvider
		.state('todo', {
			url: '/todo',
			templateUrl: todoTpl.name,
			controller: 'TodoCtrl'
		})
		.state('todo.all', {
			url: '/all',
			templateUrl: todoTpl.name,
			controller: 'TodoCtrl'
		})
		.state('todo.completed', {
			url: '/completed',
			templateUrl: todoTpl.name,
			controller: 'TodoCtrl'
		})
		.state('todo.active', {
			url: '/active',
			templateUrl: todoTpl.name,
			controller: 'TodoCtrl'
		});
});

export default todoModule;
