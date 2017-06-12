import gulp from 'gulp';

export async function statics() {
	return gulp
		.src('./src/clien*/{assets/**/*.*,**/*.html}')
		.pipe(gulp.dest('dist'));
}

gulp.task('statics', () => {
	if (process.env.NODE_ENV === 'development') {
		gulp.watch('./src/clien*/{assets/**/*.*,**/*.html}', statics);
	}

	return statics();
});
