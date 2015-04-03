import angular from 'angular';
import todoModule from 'app/todo/controllers/todoCtrl';
import 'angular-mocks';


describe('Todo Controller', function () {
	var ctrl, $rootScope, $state, $scope, todoStorage;

	function goTo(url) {
		$state.go(url);
		$rootScope.$digest();
	}

	// Load the module containing the app, only 'ng' is loaded by default.
	beforeEach(angular.mock.module(todoModule.name));

	beforeEach(inject(function (_$rootScope_, _$state_, _todoStorage_) {
		$rootScope = _$rootScope_;
		$state = _$state_;

		todoStorage = _todoStorage_;

		$scope = $rootScope.$new();

		todoStorage.reset();
	}));

	describe('initial state', function() {
		beforeEach(inject(function($controller) {
			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				$state: $state
			});
		}));

		it('should not have an edited Todo on start', function () {
			expect($scope.editedTodo).toBeNull();
		});

		it('should not have any Todos on start', function () {
			expect($scope.todos.length).toBe(0);
		});

		it('should have all Todos completed', function () {
			$scope.$digest();
			expect($scope.allChecked).toBeTruthy();
		});
	});

	describe('the filter', function () {
		it('should default to ""', inject(function ($controller) {
			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				$state: $state
			});

			goTo('todo');
			expect($scope.statusFilter).toBeUndefined();
		}));
	});

	describe('being at /active', function () {
		it('should filter non-completed', inject(function ($controller) {
			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				$state: $state
			});

			goTo('todo.active');
			expect($scope.statusFilter.completed).toBeFalsy();
		}));

		it('should filter non-completed with predefined state', inject(function ($controller) {
			$state.current.url = '/active';

			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				$state: $state
			});

			expect($scope.statusFilter.completed).toBeFalsy();
		}));
	});

	describe('being at /completed', function () {
		it('should filter completed', inject(function ($controller) {
			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				$state: $state
			});

			goTo('todo.completed');
			expect($scope.statusFilter.completed).toBeTruthy();
		}));

		it('should filter completed with predefined state', inject(function ($controller) {
			$state.current.url = '/completed';

			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				$state: $state
			});

			expect($scope.statusFilter.completed).toBeTruthy();
		}));
	});

	describe('having no Todos', function () {
		beforeEach(inject(function ($controller) {
			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				todoStorage: todoStorage
			});
			$scope.$digest();
		}));

		it('should not add empty Todos', function () {
			$scope.newTodo = '';
			$scope.addTodo();
			$scope.$digest();
			expect($scope.todos.length).toBe(0);
		});

		it('should not add items consisting only of whitespaces', function () {
			$scope.newTodo = '   ';
			$scope.addTodo();
			$scope.$digest();
			expect($scope.todos.length).toBe(0);
		});


		it('should trim whitespace from new Todos', function () {
			$scope.newTodo = '  buy some unicorns  ';
			$scope.addTodo();
			$scope.$digest();
			expect($scope.todos.length).toBe(1);
			expect($scope.todos[0].title).toBe('buy some unicorns');
		});
	});

	describe('having some saved Todos', function () {
		beforeEach(inject(function ($controller) {
			ctrl = $controller('TodoCtrl', {
				$rootScope: $rootScope,
				$scope: $scope,
				todoStorage: todoStorage
			});

			todoStorage.insert({ title: 'Uncompleted Item 0', completed: false }).then();
			todoStorage.insert({ title: 'Uncompleted Item 1', completed: false }).then();
			todoStorage.insert({ title: 'Uncompleted Item 2', completed: false }).then();
			todoStorage.insert({ title: 'Completed Item 0', completed: true }).then();
			todoStorage.insert({ title: 'Completed Item 1', completed: true }).then();
			$scope.$digest();
		}));

		it('should count Todos correctly', function () {
			expect($scope.todos.length).toBe(5);
			expect($scope.remainingCount).toBe(3);
			expect($scope.allChecked).toBeFalsy();
		});

		it('should save Todos to local storage', function () {
			expect($scope.todos.length).toBe(5);
		});

		it('should remove Todos w/o title on saving', function () {
			var todo = todoStorage.todos[2];
			$scope.editTodo(todo);
			todo.title = '';
			$scope.saveEdits(todo);
			expect($scope.todos.length).toBe(4);
		});

		it('should trim Todos on saving', function () {
			var todo = todoStorage.todos[0];
			$scope.editTodo(todo);
			todo.title = ' buy moar unicorns  ';
			$scope.saveEdits(todo);
			expect($scope.todos[0].title).toBe('buy moar unicorns');
		});

		it('clearCompletedTodos() should clear completed Todos', function () {
			$scope.clearCompletedTodos();
			expect($scope.todos.length).toBe(3);
		});

		it('markAll() should mark all Todos completed', function () {
			$scope.markAll(true);
			$scope.$digest();
			expect($scope.remainingCount).toBe(0);
			expect($scope.completedCount).toBe(5);
		});

		it('revertTodo() get a Todo to its previous state', function () {
			var todo = todoStorage.todos[0];
			$scope.editTodo(todo);
			todo.title = 'Unicorn sparkly skypuffles.';
			$scope.revertEdits(todo);
			$scope.$digest();
			expect($scope.todos[0].title).toBe('Uncompleted Item 0');
		});
	});
});
