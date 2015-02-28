[![npm version](https://badge.fury.io/js/systemjs-seed.svg)](https://badge.fury.io/js/systemjs-seed)
[![npm dependencies](https://david-dm.org/lookfirst/systemjs-seed.svg)](https://david-dm.org/lookfirst/systemjs-seed)
[![Build Status](https://travis-ci.org/lookfirst/systemjs-seed.svg)](https://travis-ci.org/lookfirst/systemjs-seed)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/lookfirst/systemjs-seed)

# SystemJS + AngularJS

Seed project for ES6 modules via SystemJS with ES6 syntax using Babel (was: 6to5) that lazy-load and bundle build with AngularJS.

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

- Adds support for CoffeeScript
- Uses [gulp-helpers](https://github.com/lookfirst/gulp-helpers) to DRY the gulpfile
- Adds `run` and `default` gulp targets
- Project is served from the `dist` folder
- Fixes a bunch of misc small build file and lint issues
- Override of port number with environment
- index.html is based on a template
- Templates are exported modules and can be referred to by name
- Enables Angular html5Mode by default
- Uses the [karma-babel-preprocessor](https://github.com/babel/karma-babel-preprocessor) to ES6 compile tests inline
- Moves all tests to a separate folder to prevent leakage into `dist`
- Minifies HTML in production

### Install & Run

1. `npm install -g gulp jspm`
2. `npm install`
3. `gulp run`
4. Browse to `http://localhost:9000`

### Gulp Tasks

- `gulp test` to run karma tests
- `gulp lint` to run jshint
- `export SITUATION=production && gulp run` to bundle, cache bust, minify and run in production mode (great for Heroku)

### Tooling

- [EditorConfig](http://editorconfig.org/)
- [JSHint](http://jshint.com/install/)

### Best Practices

- https://github.com/johnpapa/angularjs-styleguide
- https://github.com/gocardless/angularjs-style-guide
- http://sett.ociweb.com/sett/settApr2014.html

### Research & Resources

- https://github.com/systemjs/systemjs
- https://github.com/gocardless/es6-angularjs
- http://glenmaddern.com/articles/javascript-in-2015
- https://github.com/marcj/angular-es6-annotations
- https://github.com/robianmcd/angular-next
- https://github.com/ng-next/ng-next-example
