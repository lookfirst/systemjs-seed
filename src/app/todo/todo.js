import todoModule from './todoModule';

// must export this near the top
export default todoModule;

import todoTpl from 'app/todo/todo.tpl';
import 'todomvc-common/base.css!';
import 'todomvc-app-css/index.css!';

import './controllers/todoCtrl';

todoModule.config(function ($stateProvider) {

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
