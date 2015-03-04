import angular from 'angular';
import appModule from 'app/app';
import todoTpl from 'app/todo/todo.tpl';

import 'todomvc-common/base.css!';
import 'todomvc-app-css/index.css!';

export default angular.module('todomvc', [appModule.name, todoTpl.name]);
