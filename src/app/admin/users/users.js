import angular from 'angular';
import {modalModule} from 'common/components/modal';
import {selectModule} from 'common/components/select';
import {dateModule} from 'common/components/date';
import {timeModule} from 'common/components/time';
import usersTpl from 'app/admin/users/users.tpl';

export var usersModule = angular.module('admin.users',
	[modalModule.name, selectModule.name, dateModule.name, timeModule.name, usersTpl.name]);

usersModule.controller('UsersController', function() {
	console.log('users!');
});
