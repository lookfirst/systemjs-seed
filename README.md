[![npm version](https://badge.fury.io/js/systemjs-seed.svg)](https://badge.fury.io/js/systemjs-seed)
[![npm dependencies](https://david-dm.org/lookfirst/systemjs-seed.svg)](https://david-dm.org/lookfirst/systemjs-seed)
[![Build Status](https://travis-ci.org/lookfirst/systemjs-seed.svg)](https://travis-ci.org/lookfirst/systemjs-seed)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/lookfirst/systemjs-seed)

# SystemJS + AngularJS + React

Seed project for ES6 modules via SystemJS with ES6 syntax using Babel (was: 6to5) that lazy-load and bundle build with AngularJS and React.

Based heavily off the *excellent* [angular-systemjs-seed](https://github.com/Swimlane/angular-systemjs-seed) project.

This project does everything the parent project does:

- ES6 Syntax via Babel (was: 6to5) with source maps
- ES6 Modules via SystemJS - No more requirejs!
- Karma / Jasmine unit tests with coverage report
- Lazy-loading modules via routes with AngularJS
- Easy watch/browser-sync/lint/test/build setup via Gulp
- LESS CSS Support with source maps and minification
- AngularJS Template Compilation
- AngularJS ngAnnotate
- Bundle builds via SystemJS Builder
- Cache Busting with SystemJS
- Demonstrates on-demand CSS theme loading
- Demonstrates the [systemjs-route-bundler](https://github.com/Swimlane/systemjs-route-bundler) route bundler

But wait, there's more!

- Adds example [TodoMVC app](https://github.com/lookfirst/systemjs-seed/tree/master/src/app/todo) ([with unit and e2e tests](https://github.com/lookfirst/systemjs-seed/tree/master/test/app/todo)!)
- Adds support for CoffeeScript (optional)
- Adds support for React (through [ngReact](https://github.com/davidchang/ngReact))
- Uses [gulp-helpers](https://github.com/lookfirst/gulp-helpers) to DRY the gulpfile
- Adds `run` and `default` gulp targets
- Project is served from the `dist` folder for security
- Fixes a bunch of misc small build file and lint issues
- Override of port number with environment
- index.html is based on a template
- Templates are exported modules and can be referred to by name
- Enables Angular html5Mode by default
- Uses the [karma-babel-preprocessor](https://github.com/babel/karma-babel-preprocessor) to ES6 compile tests inline
- Moves all tests to a separate folder to prevent leakage into `dist`
- Minifies HTML in production
- Runs tests on Travis CI using PhantomJS and Protractor

## How to use this project

Duplicate the repository, don't fork it. The reason for this is that you probably want your own name and do not want github to record that you've forked it. Instructions: https://help.github.com/articles/duplicating-a-repository/

### Layout

This should give you an idea of how to get started with building your own project. Most of the effort required will be actually deleting the existing app examples and building your own.

* `package.json::jspm` -- Location of our library dependencies, such as angular. Manage with `jspm install [DEP]`.
* `src/system.config.js` -- Where jspm manages all of its installed dependencies.
* `src/index.tpl.html` -- The main entrypoint for the application. This loads `system.js`, `system.config.js` and the application.
* `src/app/routes.json` -- Declare all of your top level routes here.
* `src/app/app.coffee` -- Bootstraps angular and is the top level module. Example of using CoffeeScript with ES6 code.
* `src/app/FOLDER` -- Each component of your application should have its own folder.
* `src/app/todo/todo.js` -- Main entrypoint for the todo application. Sets up all the routes directly related to this app, imports the controller, templates, css, etc.
* `src/app/react/exampleApplication.jsx` -- Main entrypoint for the example React application.
* `test` -- This is where the tests live. It has been hard to find examples of good testing practices (especially for angular), so the todo application has very thorough tests for directives and controllers. e2e testing is currently undefined, but will be added soon.
 
### Install & Run

1. `npm install -g gulp jspm`
2. `npm install`
3. `gulp run`
4. Browse to `http://localhost:9000`

### Gulp Tasks

- `gulp test` to run karma tests using Chrome
- `npm test` to run karma tests using PhantomJS (for Travis CI)
- `gulp lint` to run jshint
- `export SITUATION=production && gulp run` to bundle, cache bust, minify and run in production mode (great for Heroku)

### Tooling

- [Gulp](http://gulpjs.com/)
- [EditorConfig](http://editorconfig.org/)
- [JSHint](http://jshint.com/install/)
- [Karma](http://karma-runner.github.io)
- [jspm](http://jspm.io/)
- [Babel](http://babeljs.io/)
- [SystemJS](https://github.com/systemjs/systemjs)
- [AngularJS](http://angularjs.org)
- [React](http://facebook.github.io/react/)

### Best Practices

- https://github.com/johnpapa/angularjs-styleguide
- https://github.com/gocardless/angularjs-style-guide
- http://sett.ociweb.com/sett/settApr2014.html
- http://todomvc.com/examples/angularjs-perf/#/

### Research & Resources

- https://github.com/systemjs/systemjs
- https://github.com/gocardless/es6-angularjs
- http://glenmaddern.com/articles/javascript-in-2015
- https://github.com/marcj/angular-es6-annotations
- https://github.com/robianmcd/angular-next
- https://github.com/ng-next/ng-next-example

### FAQ

Q: I use bower, what happened to it? Can I still use it?

A: jspm is an alternative to bower that is just as functional, but integrates nicely with SystemJS. You can still use bower if you like, but there is no need for it anymore. Bower was originally part of this project, but it has been removed. If you'd like to see what it was like to use it, please see [this commit](https://github.com/lookfirst/systemjs-seed/commit/83c246ee1cabc4e8b3aa2aee49418954e913a1f8) and [this commit](https://github.com/lookfirst/systemjs-seed/commit/377ae05f9425c8969682bf328f207e0dcc8c3c8e).
