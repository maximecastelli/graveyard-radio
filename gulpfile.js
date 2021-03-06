var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var server = require('gulp-server-livereload');


var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/*
 * Build the Jekyll Site
 * runs a child process in node that runs the jekyll commands
 */
gulp.task('jekyll-build', function (done) {
	return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'})
		.on('close', done);
});

/*
 * Rebuild Jekyll & reload browserSync
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/*
 * Build the jekyll site and launch browser-sync
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

/*
* Compile and minify sass
*/
gulp.task('sass', function() {
  gulp.src('_src/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('assets/css'));
		//.pipe(browserSync.stream({match: '**/*.css'}));
});

/*
 * Minify images
 */
gulp.task('imagemin', function() {
	return gulp.src('_src/img/**/*.{jpg,png,gif}')
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/img/'));
});

/**
 * Compile and minify js
 */
gulp.task('js', function(){
	return gulp.src('_src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
});

/**
 * redirect css libs
 */

 gulp.task('libs', function(){
 	return gulp.src('_src/styles/_libs/*.css')
 		.pipe(plumber())
 		.pipe(gulp.dest('assets/css/libs'))
 });

gulp.task('watch', function() {
  gulp.watch('_src/styles/**/*.scss', ['sass']);
  gulp.watch('_src/js/**/*.js', ['js']);
	gulp.watch('_src/img/**/*.{jpg,png,gif}', ['imagemin']);
  gulp.watch(['*html', '_pages/*html', '_includes/*html', '_layouts/*.html', '_pages/projects/*html' ], ['jekyll-rebuild']);


});

gulp.task('default', [ 'libs', 'js', 'sass', 'imagemin','browser-sync', 'watch']);
