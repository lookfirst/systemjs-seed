import angular from 'angular';

var userModule = angular.module('user', []);
userModule.factory('CurrentUser', ['$q', function CurrentUser($q) {

	return {

		get: function() {
			var deferred = $q.defer();

			deferred.resolve({
				name: 'Panda'
			});

			return deferred.promise;
		}

	};

}]);

export default userModule;
