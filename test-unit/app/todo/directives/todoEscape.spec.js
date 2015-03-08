import angular from 'angular';
import todoModule from 'app/todo/directives/todoEscape';
import 'angular-mocks';

beforeEach(angular.mock.module(todoModule.name));

describe('todoEscape directive', () => {
	var $scope, $compile;

	var triggerKeyDown = function (element, keyCode) {
		element.triggerHandler({type: 'keydown', keyCode: keyCode});
	};

	beforeEach(inject((_$rootScope_, _$compile_) => {
		let $rootScope = _$rootScope_;
		$compile = _$compile_;

		$scope = $rootScope.$new();

		$scope.func = function(todo) {}
	}));

	it('should bind on compile', () => {
		var el = angular.element('<input todo-escape="func(todo)">');

		spyOn($scope, 'func');

		$compile(el)($scope);

		triggerKeyDown(el, 27); // escape key

		expect($scope.func).toHaveBeenCalled();
	});
});
