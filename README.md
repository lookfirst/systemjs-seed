# SystemJS + AngularJS

Seed project for ES6 modules via SystemJS with ES6 syntax using 6to5 that lazy-load and bundle build with AngularJS.

Based heavily off the *excellent* [angular-systemjs-seed](https://github.com/Swimlane/angular-systemjs-seed) project.

This project does everything the parent project does:

- ES6 Syntax via 6to5 with source maps
- ES6 Modules via SystemJS
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

In addition it also:

- Adds support for CoffeeScript
- Uses CS for the gulpfile
- Adds `dev` and `prod` gulp targets
- Fixes a bunch of misc small build file and lint issues
- Enables override of port number with environment
- index.html is based on a template
- Adds support for ngReact (TODO)
- Enables Angular html5Mode by default

### Install & Run

1. `npm install -g gulp jspm bower`
2. `npm install`
3. `gulp dev`
4. Browse to `http://localhost:9000`

### Gulp Tasks

- `gulp test` to run karma tests
- `gulp lint` to run jshint
- `gulp prod` to bundle, cache bust, and minify

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
