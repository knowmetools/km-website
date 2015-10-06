var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
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
		.pipe(autoprefixer({
			browsers: ['> 5%'],
			cascade: true
		}))
		.pipe(gulp.dest('./public_html/css'))
		.pipe(min_css())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./public_html/css'))
		.pipe(browser_sync.stream({once: true}));
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./public_html/js'));
});

gulp.task('vendor-scripts-copy', function() {
	return gulp.src('./src/**/vendors/**/*.js')
		.pipe(rename({
			dirname: 'vendors'
		}))
		.pipe(gulp.dest('./public_html/js'));
});

// tasks that need browser sync reloads after completing
gulp.task('html-watch', ['html'], function() {browser_sync.reload();});
gulp.task('scripts-watch', ['scripts'], function() {browser_sync.reload();});

// watch for changes in files and run the appropriate tasks
gulp.task('watch', function() {
	gulp.watch('./src/**/*.html', ['html-watch']);
	gulp.watch('./src/js/*.js', ['scripts-watch']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// browser sync task that runs all other tasks first.
gulp.task('browser-sync', ['sass', 'html', 'scripts', 'vendor-scripts-copy'], function() {
	browser_sync.init({
		open: false,
		server: {
			baseDir: "public_html"
		}
	});
});

// default task
gulp.task('default', ['browser-sync', 'watch']);