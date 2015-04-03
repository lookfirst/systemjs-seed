import angular from 'angular';

import todoModule from '../todoModule';
import '../services/todoStorage';
import '../directives/todoEscape';
import '../directives/todoFocus';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todoModule.controller('TodoCtrl', function TodoCtrl($rootScope, $scope, $state, $filter, todoStorage) {
	var todos;
	var setStatusFilter = function(currentState) {
		$scope.statusFilter = { '/active': {completed: false}, '/completed': {completed: true} }[currentState.url];
	};

	$scope.todos = [];
	$scope.newTodo = '';
	$scope.editedTodo = null;

	setStatusFilter($state.current);

	todoStorage.get().then(function(allTodos) {
		todos = $scope.todos = allTodos;
	});

	$scope.$watch('todos', function () {
		$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
		$scope.completedCount = todos.length - $scope.remainingCount;
		$scope.allChecked = !$scope.remainingCount;
	}, true);

	$rootScope.$on('$stateChangeStart', function(event, toState) {
		setStatusFilter(toState);
	});

	$scope.addTodo = function () {
		var newTodo = {
			title: $scope.newTodo.trim(),
			completed: false
		};

		if (!newTodo.title) {
			return;
		}

		$scope.saving = true;
		todoStorage.insert(newTodo)
			.then(function success() {
				$scope.newTodo = '';
			})
			.finally(function () {
				$scope.saving = false;
			});
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};

	$scope.saveEdits = function (todo, event) {
		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.
		if (event === 'blur' && $scope.saveEvent === 'submit') {
			$scope.saveEvent = null;
			return;
		}

		$scope.saveEvent = event;

		if ($scope.reverted) {
			// Todo edits were reverted-- don't save.
			$scope.reverted = null;
			return;
		}

		todo.title = todo.title.trim();

		if (todo.title === $scope.originalTodo.title) {
			$scope.editedTodo = null;
			return;
		}

		todoStorage[todo.title ? 'put' : 'delete'](todo)
			.then(function success() {}, function error() {
				todo.title = $scope.originalTodo.title;
			})
			.finally(function () {
				$scope.editedTodo = null;
			});
	};

	$scope.revertEdits = function (todo) {
		todos[todos.indexOf(todo)] = $scope.originalTodo;
		$scope.editedTodo = null;
		$scope.originalTodo = null;
		$scope.reverted = true;
	};

	$scope.removeTodo = function (todo) {
		todoStorage.delete(todo);
	};

	$scope.saveTodo = function (todo) {
		todoStorage.put(todo);
	};

	$scope.toggleCompleted = function (todo, completed) {
		if (angular.isDefined(completed)) {
			todo.completed = completed;
		}
		todoStorage.put(todo, todos.indexOf(todo))
			.then(function success() {}, function error() {
				todo.completed = !todo.completed;
			});
	};

	$scope.clearCompletedTodos = function () {
		todoStorage.clearCompleted();
	};

	$scope.markAll = function (completed) {
		todos.forEach(function (todo) {
			if (todo.completed !== completed) {
				$scope.toggleCompleted(todo, completed);
			}
		});
	};
});

export default todoModule;
