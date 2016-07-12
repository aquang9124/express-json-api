var gulp = require('gulp');
var sass = require('gulp-sass');

// path to src files and output directories
var paths = {
	scss: './app/stylesheets/sass/*.scss',
	css: './public/assets/css'
};

gulp.task('sass', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
	gulp.watch(paths.scss, ['sass']);
});

gulp.task('default', ['sass', 'watch']);