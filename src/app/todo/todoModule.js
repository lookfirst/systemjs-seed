import angular from 'angular';
import todoTpl from 'app/todo/todo.tpl';

import 'todomvc-common/base.css!';
import 'todomvc-app-css/index.css!';

export default angular.module('todomvc', [todoTpl.name]);
