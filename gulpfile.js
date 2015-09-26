var gulp = require('gulp');

var min_css = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

// move html from the src folder to public_html
gulp.task('html', function() {
	gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./public_html'));
});

// sass task
gulp.task('sass', function() {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public_html/css'))
		.pipe(min_css())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./public_html/css'));
});

// watch for changes in files and run the appropriate tasks
gulp.task('watch', function() {
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// default task
gulp.task('default', ['sass', 'html', 'watch']);