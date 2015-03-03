import angular from 'angular';
import routing from 'common/utils/routing';

var app = angular.module('app', []);

app.config(routing(app));

export default app;
