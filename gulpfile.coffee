fs = require('fs')

gulp = require('gulp')

gulpHelpers = require('gulp-helpers')
taskMaker = gulpHelpers.taskMaker(gulp)
situation = gulpHelpers.situation()

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


taskMaker.defineTask('clean', { src: path.output })
taskMaker.defineTask('less', { src: path.less, dest: path.output })
taskMaker.defineTask('less', { taskName: 'less-themes', src: path.themes, dest: path.themesOutput })
taskMaker.defineTask('es6', { src: path.source, dest: path.output })
taskMaker.defineTask('es6', { taskName: 'es6-coffee', src: path.coffee, dest: path.output, coffee: true })
taskMaker.defineTask('ngHtml2Js', { taskName: 'html', src: path.templates, dest: path.output })
taskMaker.defineTask('copy', { src: path.assets, dest: path.output })
taskMaker.defineTask('copy', { taskName: 'json', src: path.json, dest: path.output, changed: { extension: '.json' } })
taskMaker.defineTask('copy', { taskName: 'index.html', src: path.index, dest: path.output, rename: 'index.html' })
taskMaker.defineTask('copy', { taskName: 'cache-bust-index.html', src: path.index, dest: path.output, rename: 'index.html', replace: cacheBustConfig })
taskMaker.defineTask('watch', { src: path.watch, tasks: ['compile', 'index.html'] })
taskMaker.defineTask('minify', { src: path.minify, dest: path.output })
taskMaker.defineTask('jshint', { taskName: 'lint', src: path.source })
taskMaker.defineTask('karma', { configFile: path.karmaConfig })
taskMaker.defineTask('browserSync', { taskName: 'serve', config: serverOptions, historyApiFallback: true })
taskMaker.defineTask('routeBundler', { config: routeBundleConfig })

gulp.task 'compile', (callback) ->
	runSequence(
		['less', 'less-themes', 'html', 'es6', 'es6-coffee', 'json', 'copy']
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

gulp.task 'run', (callback) ->
	if situation.isProduction()
		runSequence(
			'recompile'
			'routeBundler'
			'cache-bust-index.html'
			'minify'
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
