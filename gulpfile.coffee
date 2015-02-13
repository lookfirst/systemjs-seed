gulp = require('gulp')
gutil = require('gulp-util')
changed = require('gulp-changed')
to5 = require('gulp-6to5')
insert = require('gulp-insert')
cache = require('gulp-cached')
sourcemaps = require('gulp-sourcemaps')
ngHtml2Js = require('gulp-ng-html2js')
htmlMin = require('gulp-minify-html')
uglify = require('gulp-uglify')
plumber = require('gulp-plumber')
coffee = require('gulp-coffee')
less = require('gulp-less')
ngAnnotate = require('gulp-ng-annotate')
jshint = require('gulp-jshint')
rename = require('gulp-rename')
replace = require('gulp-replace-task')

karma = require('karma').server
stylish = require('jshint-stylish')
lessPluginCleanCSS = require('less-plugin-clean-css')
cleancss = new lessPluginCleanCSS({advanced: true})
browserSync = require('browser-sync')
runSequence = require('run-sequence')
vinylPaths = require('vinyl-paths')
RSVP = require('rsvp')
del = require('del')
routeBundler = require('systemjs-route-bundler')
historyApiFallback = require('connect-history-api-fallback')

serverOptions = {}
serverOptionsProd =
	open: false
	ui: false
	notify: false
	ghostMode: false
	codeSync: false
	reloadOnRestart: false
	port: process.env.PORT || 9000

serverOptionsDev =
	open: false
	ui: false
	notify: false
	ghostMode: false
	port: process.env.PORT || 9000

compilerOptions =
	filename: ''
	filenameRelative: ''
	blacklist: []
	whitelist: []
	sourceRoot: ''
	moduleRoot: ''
	moduleIds: false
	runtime: false
	experimental: false
	format:
		comments: false
		compact: false
		indent:
			parentheses: true
			adjustMultilineComment: true
			style: '  '
			base: 0

path =
	source: 'src/**/*.js'
	coffee: 'src/**/*.coffee'
	html: '**/*.html'
	templates: 'src/**/*.tpl.html'
	less: [
		'src/**/*.less'
		'!src/assets/**/*.less'
	]
	themes: [
		'src/theme/dark.less'
		'src/theme/light.less'
	]
	themesOutput: 'dist/theme/'
	output: 'dist/'
	routes: './src/app/routes.json'

routes = require(path.routes)

gulp.task 'compile', (callback) ->
	runSequence(
		['less', 'less-themes', 'html', 'es6', 'es6-coffee', 'json', 'move'],
		callback
	)

gulp.task 'recompile', (callback) ->
	runSequence(
		'clean'
		'compile'
		callback
	)

gulp.task 'release', (callback) ->
	runSequence(
		'clean'
		'compile'
		'cache-bust'
		'build'
		'minify'
		callback
	)

gulp.task 'dev', (callback) ->
	serverOptions = serverOptionsDev
	runSequence(
		'recompile'
		'index.html'
		'serve'
		'watch'
		callback
	)

gulp.task 'prod', (callback) ->
	serverOptions = serverOptionsProd
	runSequence(
		'release'
		'serve'
		callback
	)

gulp.task 'index.html', ->
	gulp.src('./index.tpl.html')
		.pipe(rename('./index.html'))
		.pipe(gulp.dest('./'))

gulp.task 'cache-bust', ->
	gulp.src('./index.tpl.html')
		.pipe(replace({
				usePrefix: false,
				patterns: [
					{
						match: '<!-- PROD',
						replacement: ''
					},
					{
						match: 'END -->',
						replacement: ''
					},
					{
						match: '{{hash}}',
						replacement: Math.round(new Date() / 1000)
					}
				]
			}))
		.pipe(rename('./index.html'))
		.pipe(gulp.dest('./'))

gulp.task 'test', ['recompile'], (done) ->
	karma.start({
		basePath: '.'
		configFile: __dirname + '/karma.conf.js'
	}, done)

gulp.task 'clean', ->
	gulp.src([ path.output ])
		.pipe(vinylPaths(del))

gulp.task 'html', ->
	gulp.src(path.templates)
		.pipe(cache('html'))
		.pipe(plumber())
		.pipe(changed(path.output, { extension: '.html' }))
		.pipe(htmlMin({
			empty: true
			spare: true
			quotes: true
		}))
		.pipe(ngHtml2Js())
		.pipe(insert.prepend("import angular from 'angular';\n"))
		.pipe(to5(compilerOptions))
		.pipe(gulp.dest(path.output))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'less', ->
	gulp.src(path.less)
		.pipe(cache('less'))
		.pipe(plumber())
		.pipe(changed(path.output, {extension: '.less'}))
		.pipe(sourcemaps.init())
		.pipe(less({plugins: [ cleancss ]}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.output))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'less-themes', ->
	gulp.src(path.themes)
		.pipe(cache('less-themes'))
		.pipe(plumber())
		.pipe(changed(path.output, {extension: '.less'}))
		.pipe(sourcemaps.init())
		.pipe(less({plugins: [ cleancss ]}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.themesOutput))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'es6', ->
	gulp.src(path.source)
		.pipe(cache('es6'))
		.pipe(plumber())
		.pipe(changed(path.output, { extension: '.js' }))
		.pipe(sourcemaps.init())
		.pipe(to5(compilerOptions))
		.pipe(ngAnnotate({ sourceMap: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.output))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'es6-coffee', ->
	gulp.src(path.coffee)
		.pipe(cache('es6-coffee'))
		.pipe(plumber())
		.pipe(changed(path.output, { extension: '.coffee' }))
		.pipe(sourcemaps.init())
		.pipe(coffee({ bare: true }).on('error', gutil.log))
		.pipe(to5(compilerOptions))
		.pipe(ngAnnotate({ sourceMap: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.output))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'move', ->
	gulp.src([
		'./src/**/*.svg'
		'./src/**/*.woff'
		'./src/**/*.ttf'
		'./src/**/*.png'
		'./src/**/*.ico'
		'./src/**/*.jpg'
		'./src/**/*.eot'
	])
		.pipe(cache('move'))
		.pipe(plumber())
		.pipe(gulp.dest(path.output))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'json', ->
	gulp.src('./src/**/*.json')
		.pipe(cache('json'))
		.pipe(plumber())
		.pipe(changed(path.output, { extension: '.json' }))
		.pipe(gulp.dest(path.output))
		.pipe(browserSync.reload({ stream: true }))

gulp.task 'minify', ->
	gulp.src(['dist/**/*.js'])
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({ mangle: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.output))

gulp.task 'lint', ->
	gulp.src(path.source)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))

gulp.task 'serve', (done) ->
	acao = (req, res, next) ->
		res.setHeader('Access-Control-Allow-Origin', '*')
		next()

	serverOptions.server = {
		baseDir: ['.']
		middleware: [historyApiFallback, acao]
	}

	browserSync(serverOptions, done)

gulp.task 'watch', ->
	watcher = gulp.watch(['./src/**'], ['compile'])
	watcher.on('change', (event) ->
		console.log("File #{event.path} was #{event.type}, running tasks...")
	)

gulp.task 'build', ->
	routes = routes.map( (r) -> r.src )

	config =
		main: 'app/app'
		routes: routes
		bundleThreshold: 0.6
		config: './system.config.js'
		sourceMaps: true
		minify: false
		dest: 'dist/app'
		destJs: 'dist/app/app.js'

	routeBundler.build(config)
