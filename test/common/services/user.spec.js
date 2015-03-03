import angular from 'angular';
import userModule from 'common/services/user';
import 'angular-mocks';


describe('CurrentUser', function() {
	beforeEach(angular.mock.module(userModule.name));

	var CurrentUser, $rootScope;

	beforeEach(inject(function(_CurrentUser_, _$rootScope_) {
		CurrentUser = _CurrentUser_;
		$rootScope = _$rootScope_;
	}));

	describe('.get', function() {
		it('has a user', function() {
			var user;
			CurrentUser.get().then(function(data) {
				user = data;
			});

			$rootScope.$digest();

			expect(user).toEqual({name: 'Panda'});
		});
	});

});
