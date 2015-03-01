import todomvc from './todoModule';
import todoTpl from 'app/todo/todo.tpl';
import './controllers/todoCtrl';

todomvc.config(function ($stateProvider) {

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

export default todomvc;
