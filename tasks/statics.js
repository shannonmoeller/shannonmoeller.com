import gulp from 'gulp';
import svgstore from 'gulp-svgstore';

export async function staticsAssets() {
	return gulp
		.src('./src/clien*/{assets/media/**/*.*,**/*.html}')
		.pipe(gulp.dest('dist'));
}

export async function staticsIcons() {
	return gulp
		.src('./src/client/assets/icons/*.svg')
		.pipe(svgstore())
		.pipe(gulp.dest('dist/client/assets/media'));
}

export const statics = gulp.parallel(
	staticsAssets,
	staticsIcons,
);

gulp.task('statics', async () => {
	if (process.env.NODE_ENV === 'development') {
		gulp.watch('./src/clien*/{assets/media/**/*.*,**/*.html}', staticsAssets);
		gulp.watch('./src/client/assets/icons/*.svg', staticsIcons);
	}

	return statics();
});
