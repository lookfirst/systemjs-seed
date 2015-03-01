import todomvc from '../todoModule';

todomvc.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs-systemjs';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
