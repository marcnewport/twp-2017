var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var cp = require('child_process');




// Concatenates svgs into one file and minifies - use xlink with file name as id
gulp.task('svgstore', function() {
	return gulp.src('_svg/**')
		.pipe(svgmin(function(file) {
			return {
				plugins: [{
					removeDoctype: true,
					cleanupIDs: {
						minify: true
					},
					removeUnknownsAndDefaults: true,
					removeUselessStrokeAndFill: true
				}]
			}
		}))
		.pipe(svgstore())
		.pipe(rename('svg.html'))
		.pipe(gulp.dest('_includes'));
});



// Concatenate and export vendor scripts
gulp.task('vendorJs', function() {
	// Add vendor scripts to array in order of dependancy
	return gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/slick-carousel/slick/slick.min.js',
			// 'bower_components/scrollreveal/dist/scrollreveal.min.js'
			'bower_components/waypoints/lib/jquery.waypoints.min.js',
			'_js/vendor/jquery.trap.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('js'));
});



// Gather js files defined below, insert any partials, and export
gulp.task('js', function() {
	// Add your scripts to array in order of dependancy
	return gulp.src([
			'_js/main.js'
		])
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(gulp.dest('js'));
});



gulp.task('watch', ['browserSync'], function () {
	gulp.watch(
		[
			'_includes/**/*',
			'_layouts/**/*',
			'_posts/**/*',
			'_sass/**/*',
			'admin/**/*',
			'js/**/*',
			'*.html'
		],
		['jekyll:rebuild']
	);
	gulp.watch('_svg/**/*', ['svgstore']);
	gulp.watch(
		[
			'_js/vendor/**/*',
			'bower_components/**/*'
		],
		['vendorJs']
	);
	gulp.watch('_js/**/*', ['js']);
});



// Setup browser-sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '_site'
		}
	});
});


gulp.task('browserSync:reload', function() {
	browserSync.reload();
});



// gulp.task('build', function (callback) {
// 	runSequence(
// 		'clean:dist',
// 		'svgstore',
// 		'assets',
// 		'html',
// 		'sass',
// 		'vendorJs',
// 		'js',
// 		callback
// 	);
// });


// gulp.task('jekyll', shell.task([
// 	'bundle exec jekyll serve --watch'
// ]));

gulp.task('jekyll', function(done) {
	console.log('Compiling Jekyll');
	browserSync.notify('Compiling Jekyll');
	return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).on('close', done);
});

// Rebuild Jekyll site
gulp.task('jekyll:rebuild', function(callback) {
	runSequence('jekyll', 'browserSync:reload', callback);
});



gulp.task('default', ['jekyll', 'svgstore', 'vendorJs', 'js', 'watch']);
