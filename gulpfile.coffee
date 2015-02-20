fs = require('fs')

gulp = require('gulp')

gulp_helpers = require('gulp-helpers')
taskMaker = gulp_helpers.taskMaker(gulp)
situation = gulp_helpers.situation()

runSequence = require('run-sequence')

path =
	source: 'src/**/*.js'
	coffee: 'src/**/*.coffee'
	html: '**/*.html'
	templates: [
		'src/**/*.tpl.html'
		'!src/index.tpl.html'
	]
	less: [
		'src/**/*.less'
		'!src/assets/**/*.less'
	]
	themes: [
		'src/assets/themes/dark.less'
		'src/assets/themes/light.less'
	]
	themesOutput: 'dist/assets/themes/'
	output: 'dist/'
	routes: './src/app/routes.json'
	minify: ['dist/**/*.js']
	assets: [
		'./src/**/*.svg'
		'./src/**/*.woff'
		'./src/**/*.ttf'
		'./src/**/*.png'
		'./src/**/*.ico'
		'./src/**/*.gif'
		'./src/**/*.jpg'
		'./src/**/*.eot'
	]
	json: './src/**/*.json'
	index: './src/index.tpl.html'
	watch: './src/**'
	karmaConfig: __dirname + '/karma.conf.js'

if situation.isProduction()
	serverOptions =
		open: false
		ui: false
		notify: false
		ghostMode: false
		codeSync: false
		reloadOnRestart: false
		port: process.env.PORT || 9000
		server: {
			baseDir: [path.output]
			routes: {
				'/jspm_packages': './jspm_packages'
			}
		}
else if situation.isDevelopment()
	serverOptions =
		open: false
		ui: false
		notify: false
		ghostMode: false
		port: process.env.PORT || 9000
		server: {
			baseDir: [path.output]
			routes: {
				'/jspm_packages': './jspm_packages'
				'/bower_components': './bower_components'
			}
	}

cacheBustConfig =
	usePrefix: false,
	patterns: [
		{
			match: '<!-- PROD'
			replacement: ''
		},
		{
			match: 'END -->'
			replacement: ''
		},
		{
			match: '{{hash}}'
			replacement: Math.round(new Date() / 1000)
		}
	]


routes = require(path.routes)
routesSrc = routes.map( (r) -> r.src )
routeBundleConfig =
	baseURL: path.output
	main: 'app/app'
	routes: routesSrc
	bundleThreshold: 0.6
	config: './src/system.config.js'
	sourceMaps: true
	minify: false
	dest: 'dist/app'
	destJs: 'dist/app/app.js'


taskMaker.defineTask('clean', { path: path.output })
taskMaker.defineTask('less', { path: path.less, output: path.output })
taskMaker.defineTask('less', { taskName: 'less-themes', path: path.themes, output: path.themesOutput })
taskMaker.defineTask('es6', { source: path.source, output: path.output })
taskMaker.defineTask('es6', { taskName: 'es6-coffee', source: path.coffee, output: path.output, coffee: true })
taskMaker.defineTask('ngHtml2Js', { taskName: 'html', templates: path.templates, output: path.output })
taskMaker.defineTask('copy', { path: path.assets, output: path.output })
taskMaker.defineTask('copy', { taskName: 'json', path: path.json, output: path.output, changed: { extension: '.json' } })
taskMaker.defineTask('copy', { taskName: 'index.html', path: path.index, output: path.output, rename: 'index.html' })
taskMaker.defineTask('copy', { taskName: 'cache-bust', path: path.index, output: path.output, rename: 'index.html', replace: cacheBustConfig })
taskMaker.defineTask('watch', { path: path.watch, tasks: ['compile'] })
taskMaker.defineTask('minify', { path: path.minify, output: path.output })
taskMaker.defineTask('jshint', { taskName: 'lint', path: path.source })
taskMaker.defineTask('karma', { configFile: path.karmaConfig })
taskMaker.defineTask('browserSync', { taskName: 'serve', config: serverOptions, historyApiFallback: true })
taskMaker.defineTask('routeBundler', { config: routeBundleConfig })

gulp.task 'compile', (callback) ->
	runSequence(
		['less', 'less-themes', 'html', 'es6', 'es6-coffee', 'json', 'copy', 'index.html']
		callback
	)

gulp.task 'recompile', (callback) ->
	runSequence(
		'clean'
		'compile'
		callback
	)

gulp.task 'test', (callback) ->
	runSequence(
		'recompile'
		'karma'
		callback
	)

gulp.task 'release', (callback) ->
	runSequence(
		'recompile'
		'cache-bust'
		'routeBundler'
		callback
	)

gulp.task 'run', (callback) ->
	if situation.isProduction()
		runSequence(
			'release'
#			'minify'
			'serve'
			callback
		)
	else if situation.isDevelopment()
		runSequence(
			'recompile'
			'index.html'
			'serve'
			'watch'
			callback
		)
