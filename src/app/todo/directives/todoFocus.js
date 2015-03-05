import todoModule from '../todoModule';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */
todoModule.directive('todoFocus', function ($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});

export default todoModule;
