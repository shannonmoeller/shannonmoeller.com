'use strict';

var gulp = require('gulp'),
	base = { base: './src/' },
	config = { isWatching: false };

gulp.task('default', ['lint', 'markup', 'styles', 'copy']);

gulp.task('lint', function () {
	var jscs = require('gulp-jscs'),
		jshint = require('gulp-jshint');

	return gulp
		.src('./gulpfile.js')
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('markup', function () {
	var fm = require('gulp-front-matter'),
		hb = require('gulp-hb');

	return gulp
		.src('./src/*.{html,txt}', base)
		.pipe(fm({ property: 'meta' }))
		.pipe(hb({
			data: './src/assets/data/**/*.js',
			helpers: './node_modules/handlebars-layouts/index.js',
			partials: './src/assets/partials/**/*.*'
		}))
		.pipe(gulp.dest('./web/'));
});

gulp.task('styles', function () {
	var autoprefixer = require('gulp-autoprefixer'),
		minify = require('gulp-minify-css'),
		sourcemaps = require('gulp-sourcemaps'),
		when = require('gulp-if');

	return gulp
		.src('./src/assets/styles/*.css', base)
		.pipe(when(config.isWatching, sourcemaps.init()))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(minify({
			keepBreaks: true,
			processImport: true,
			relativeTo: './src/assets/styles/'
		}))
		.pipe(when(config.isWatching, sourcemaps.write()))
		.pipe(gulp.dest('./web/'));
});

gulp.task('copy', function () {
	return gulp
		.src('./src/{CNAME,LICENSE,README.md,assets/media/**}', base)
		.pipe(gulp.dest('./web/'));
});

gulp.task('watch', function () {
	var watch = require('gulp-watch'),
		lr = require('gulp-livereload');

	config.isWatching = true;

	watch('./src/**/*.{hbs,html,txt}', function () {
		gulp.start('markup');
	});

	watch('./src/**/*.css', function () {
		gulp.start('styles');
	});

	watch('./src/assets/media/**/*.*', function () {
		gulp.start('copy');
	});

	watch('./web/**/*.*').pipe(lr());
});
