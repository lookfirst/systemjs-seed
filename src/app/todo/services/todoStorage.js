import angular from 'angular';

import todoModule from '../todoModule';

todoModule.factory('todoStorage', function ($q) {
	var STORAGE_ID = 'todos-angularjs-systemjs';

	return {
		todos: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		},

		clearCompleted: function () {
			var deferred = $q.defer();

			var completeTodos = [];
			var incompleteTodos = [];
			this.todos.forEach(function (todo) {
				if (todo.completed) {
					completeTodos.push(todo);
				} else {
					incompleteTodos.push(todo);
				}
			});

			angular.copy(incompleteTodos, this.todos);

			this._saveToLocalStorage(this.todos);
			deferred.resolve(this.todos);

			return deferred.promise;
		},

		delete: function (todo) {
			var deferred = $q.defer();

			this.todos.splice(this.todos.indexOf(todo), 1);

			this._saveToLocalStorage(this.todos);
			deferred.resolve(this.todos);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(this._getFromLocalStorage(), this.todos);
			deferred.resolve(this.todos);

			return deferred.promise;
		},

		insert: function (todo) {
			var deferred = $q.defer();

			this.todos.push(todo);

			this._saveToLocalStorage(this.todos);
			deferred.resolve(this.todos);

			return deferred.promise;
		},

		put: function (todo, index) {
			var deferred = $q.defer();

			this.todos[index] = todo;

			this._saveToLocalStorage(this.todos);
			deferred.resolve(this.todos);

			return deferred.promise;
		},

		reset: function() {
			this.todos = [];
			localStorage.removeItem(STORAGE_ID);
		}
	};
});

export default todoModule;
