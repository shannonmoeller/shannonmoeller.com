'use strict';

var gulp = require('gulp'),
	base = { base: './src/' };

gulp.task('default', ['lint', 'markup', 'styles', 'media']);

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
			helpers: './node_modules/handlebars-layouts',
			partials: './src/assets/partials/**/*.*'
		}))
		.pipe(gulp.dest('./web/'));
});

gulp.task('styles', function () {
	var minify = require('gulp-minify-css');

	return gulp
		.src('./src/assets/styles/*.css', base)
		.pipe(minify({
			keepBreaks: true,
			processImport: true,
			relativeTo: './src/assets/styles/'
		}))
		.pipe(gulp.dest('./web/'));
});

gulp.task('media', function () {
	return gulp
		.src('./src/assets/media/**/*.*', base)
		.pipe(gulp.dest('./web/'));
});

gulp.task('watch', function () {
	var watch = require('gulp-watch'),
		lr = require('gulp-livereload');

	watch({ glob: './src/**/*.{hbs,html,txt}' }, function () {
		gulp.start('markup');
	});

	watch({ glob: './src/**/*.css' }, function () {
		gulp.start('styles');
	});

	watch({ glob: './src/assets/media/**/*.*' }, function () {
		gulp.start('media');
	});

	watch({ glob: './web/**/*.*' }).pipe(lr());
});
