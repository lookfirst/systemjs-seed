// The reason for this abstraction from todoModule is because
// we need to load that file first and then we load the controller.
// You can't have angular.module().controller().config(), which is
// what we would have if we had combined this file with todoModule.

import todoModule from './todoModule';

import 'todomvc-common/base.css!';
import 'todomvc-app-css/index.css!';

import './controllers/todoCtrl';

export default todoModule;
