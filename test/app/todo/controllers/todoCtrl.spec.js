import angular from 'angular';
import todoModule from 'app/todo/controllers/todoCtrl';
import 'angular-mocks';


describe('Todo Controller', function () {
	var ctrl, $rootScope, $state, $location, $scope, todoStorage;

	// Load the module containing the app, only 'ng' is loaded by default.
	beforeEach(angular.mock.module('todomvc'));

	beforeEach(inject(function (_$rootScope_, _$state_, _$location_, _todoStorage_) {
		$rootScope = _$rootScope_;
		$state = _$state_;

		$location = _$location_;
		todoStorage = _todoStorage_;

		$scope = $rootScope.$new();

		todoStorage.reset();
	}));

	describe('initial state', function() {
	//	beforeEach(inject(function($controller) {
	//		ctrl = $controller('TodoCtrl', {
	//			$rootScope: $rootScope,
	//			$scope: $scope,
	//			$state: $state
	//		});
	//	}));
	//
		it('should not have an edited Todo on start', function () {
			console.log($state);

			//		expect($scope.editedTodo).toBeNull();
		});
	//
	//	it('should not have any Todos on start', function () {
	//		expect($scope.todos.length).toBe(0);
	//	});
	//
	//	it('should have all Todos completed', function () {
	//		$scope.$digest();
	//		expect($scope.allChecked).toBeTruthy();
	//	});
	});

////	//describe('the filter', function () {
////	//	it('should default to ""', inject(function ($controller) {
////	//		ctrl = $controller('TodoCtrl', {
////	//			$rootScope: $rootScope,
////	//			$scope: $scope,
////	//			$state: $state
////	//		});
////	//
////	//		console.log($scope.statusFilter);
////	//
////	//		$state.go('todo');
////	//		//$location.url('/active');
////	//		$rootScope.$digest();
////	//
////	//		console.log($scope.statusFilter);
////	//
////	//		//console.log($state.current);
////	//
////	//		expect($state.url).toBe('');
////	//		expect($scope.statusFilter).toBeNull();
////	//	}));
////	//});
////	//
////	//	describe('being at /active', function () {
////	//		it('should filter non-completed', inject(function ($controller, $rootScope) {
////	//			ctrl = $controller('TodoCtrl', {
////	//				$rootScope: $rootScope,
////	//				$scope: scope,
////	//				$state: {
////	//					url: '/active'
////	//				},
////	//				todoStorage: store
////	//			});
////	//
////	//			scope.$emit('$stateChangeSuccess');
////	//			expect(scope.statusFilter.completed).toBeFalsy();
////	//		}));
////	//	});
////	//
////	//	describe('being at /completed', function () {
////	//		it('should filter completed', inject(function ($controller) {
////	//			ctrl = $controller('TodoCtrl', {
////	//				$scope: scope,
////	//				$state: {
////	//					url: '/completed'
////	//				},
////	//				todoStorage: store
////	//			});
////	//
////	//			scope.$emit('$stateChangeSuccess');
////	//			expect(scope.statusFilter.completed).toBeTruthy();
////	//		}));
////	//	});
////	//
////	//describe('having no Todos', function () {
////	//	var ctrl;
////	//
////	//	beforeEach(inject(function ($controller) {
////	//		ctrl = $controller('TodoCtrl', {
////	//			$scope: scope,
////	//			store: store
////	//		});
////	//		scope.$digest();
////	//	}));
////	//
////	//	it('should not add empty Todos', function () {
////	//		scope.newTodo = '';
////	//		scope.addTodo();
////	//		scope.$digest();
////	//		expect(scope.todos.length).toBe(0);
////	//	});
////	//
////	//	it('should not add items consisting only of whitespaces', function () {
////	//		scope.newTodo = '   ';
////	//		scope.addTodo();
////	//		scope.$digest();
////	//		expect(scope.todos.length).toBe(0);
////	//	});
////	//
////	//
////	//	it('should trim whitespace from new Todos', function () {
////	//		scope.newTodo = '  buy some unicorns  ';
////	//		scope.addTodo();
////	//		scope.$digest();
////	//		expect(scope.todos.length).toBe(1);
////	//		expect(scope.todos[0].title).toBe('buy some unicorns');
////	//	});
////	//});
////	//
////	//describe('having some saved Todos', function () {
////	//	var ctrl;
////	//
////	//	beforeEach(inject(function ($controller) {
////	//		ctrl = $controller('TodoCtrl', {
////	//			$scope: scope,
////	//			store: store
////	//		});
////	//
////	//		store.insert({ title: 'Uncompleted Item 0', completed: false });
////	//		store.insert({ title: 'Uncompleted Item 1', completed: false });
////	//		store.insert({ title: 'Uncompleted Item 2', completed: false });
////	//		store.insert({ title: 'Completed Item 0', completed: true })
////	//		store.insert({ title: 'Completed Item 1', completed: true })
////	//		scope.$digest();
////	//	}));
////	//
////	//	it('should count Todos correctly', function () {
////	//		expect(scope.todos.length).toBe(5);
////	//		expect(scope.remainingCount).toBe(3);
////	//		expect(scope.allChecked).toBeFalsy();
////	//	});
////	//
////	//	it('should save Todos to local storage', function () {
////	//		expect(scope.todos.length).toBe(5);
////	//	});
////	//
////	//	it('should remove Todos w/o title on saving', function () {
////	//		var todo = store.todos[2];
////	//		scope.editTodo(todo);
////	//		todo.title = '';
////	//		scope.saveEdits(todo);
////	//		expect(scope.todos.length).toBe(4);
////	//	});
////	//
////	//	it('should trim Todos on saving', function () {
////	//		var todo = store.todos[0];
////	//		scope.editTodo(todo);
////	//		todo.title = ' buy moar unicorns  ';
////	//		scope.saveEdits(todo);
////	//		expect(scope.todos[0].title).toBe('buy moar unicorns');
////	//	});
////	//
////	//	it('clearCompletedTodos() should clear completed Todos', function () {
////	//		scope.clearCompletedTodos();
////	//		expect(scope.todos.length).toBe(3);
////	//	});
////	//
////	//	it('markAll() should mark all Todos completed', function () {
////	//		scope.markAll(true);
////	//		scope.$digest();
////	//		expect(scope.remainingCount).toBe(5);
////	//	});
////	//
////	//	it('revertTodo() get a Todo to its previous state', function () {
////	//		var todo = store.todos[0];
////	//		scope.editTodo(todo);
////	//		todo.title = 'Unicorn sparkly skypuffles.';
////	//		scope.revertEdits(todo);
////	//		scope.$digest();
////	//		expect(scope.todos[0].title).toBe('Uncompleted Item 0');
////	//	});
//	});
});
