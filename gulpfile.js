'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	base = { base: './src/' },
	config = { isWatching: false };

gulp.task('default', ['lint', 'html', 'css', 'js', 'copy']);

gulp.task('lint', function () {
	var jscs = require('gulp-jscs'),
		jshint = require('gulp-jshint');

	return gulp
		.src('./gulpfile.js')
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html', function () {
	var fm = require('gulp-front-matter'),
		hb = require('gulp-hb');

	return gulp
		.src('./src/*.{html,md,txt}', base)
		.pipe(plumber())
		.pipe(fm({
			property: 'meta'
		}))
		.pipe(hb({
			data: './src/assets/data/**/*.js',
			helpers: './node_modules/handlebars-layouts/index.js',
			partials: './src/assets/tpl/**/*.*'
		}))
		.pipe(gulp.dest('./web/'));
});

gulp.task('css', function () {
	var myth = require('gulp-myth');

	return gulp
		.src('./src/assets/css/main.css', base)
		.pipe(plumber())
		.pipe(myth({
			browsers: ['last 2 versions'],
			sourceMaps: config.isWatching
		}))
		.pipe(gulp.dest('./web/'));
});

gulp.task('js', function () {
	return gulp
		.src('./src/assets/js/main.js')
		.pipe(plumber())
		.pipe(gulp.dest('./web/assets/js/'));
});

gulp.task('copy', function () {
	return gulp
		.src('./src/assets/media/**', base)
		.pipe(plumber())
		.pipe(gulp.dest('./web/'));
});

gulp.task('watch', function () {
	var watch = require('gulp-watch');

	watch('src/{*.html,assets/tpl/**/*.hbs}', function () {
		gulp.start('html');
	});

	watch('src/assets/css/**', function () {
		gulp.start('css');
	});

	watch('src/assets/js/**', function () {
		gulp.start('js');
	});
});
