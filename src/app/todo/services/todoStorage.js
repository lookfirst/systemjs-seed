import todoModule from '../todoModule';

todoModule.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs-systemjs';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		},

		insert: function (todo) {
			let todos = this.get();
			todos.push(todo);
			this.put(todos);
		},

		reset: function() {
			localStorage.removeItem(STORAGE_ID);
		}
	};
});
