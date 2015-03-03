import angular from 'angular';
import todoModule from 'app/todo/directives/todoFocus';
import 'angular-mocks';

beforeEach(angular.mock.module(todoModule.name));

describe('todoFocus directive', function () {
	var $scope, $compile, $browser;

	beforeEach(inject(function (_$rootScope_, _$compile_, _$browser_) {
		let $rootScope = _$rootScope_;
		$compile = _$compile_;
		$browser = _$browser_;
		$scope = $rootScope.$new();
	}));

	it('should focus on truthy expression', function () {
		var el = angular.element('<input todo-focus="focus">');
		$scope.focus = false;

		$compile(el)($scope);
		expect($browser.deferredFns.length).toBe(0);

		$scope.$apply(function () {
			$scope.focus = true;
		});

		expect($browser.deferredFns.length).toBe(1);
	});
});
