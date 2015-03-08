import angular from 'angular';
import todoModule from 'app/todo/directives/todoFocus';
import 'angular-mocks';

beforeEach(angular.mock.module(todoModule.name));

describe('todoFocus directive', () => {
	var $scope, $compile, $timeout;

	beforeEach(inject((_$rootScope_, _$compile_, _$timeout_) => {
		let $rootScope = _$rootScope_;
		$compile = _$compile_;
		$timeout = _$timeout_;

		$scope = $rootScope.$new();
	}));

	it('should focus on truthy expression', () => {
		var el = angular.element('<input todo-focus="focus">');

		spyOn(el[0], 'focus');

		$scope.focus = false;
		$compile(el)($scope);

		$scope.$apply(() => {
			$scope.focus = true;
		});

		$timeout.flush();

		expect(el[0].focus).toHaveBeenCalled();
	});
});
