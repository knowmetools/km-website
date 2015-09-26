var gulp = require('gulp');

var browser_sync = require('browser-sync').create();
var min_css = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

// move html from the src folder to public_html
gulp.task('html', function() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./public_html'));
});

// sass task
gulp.task('sass', function() {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public_html/css'))
		.pipe(min_css())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./public_html/css'))
		.pipe(browser_sync.stream());
});

// tasks that need browser sync reloads after completing
gulp.task('html-watch', ['html'], function() {browser_sync.reload();});

// watch for changes in files and run the appropriate tasks
gulp.task('watch', function() {
	gulp.watch('./src/**/*.html', ['html-watch']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// browser sync task that runs all other tasks first.
gulp.task('browser-sync', ['sass', 'html'], function() {
	browser_sync.init({
		open: false,
		server: {
			baseDir: "public_html"
		}
	});
});

// default task
gulp.task('default', ['browser-sync', 'watch']);