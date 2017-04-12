
var gulp = require('gulp');
var sass = require('gulp-sass');
var filesize = require('gulp-filesize');
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var path = {
  sass_path: './client/dev/sass/',
  dest_css: './client/build/css',
  js_path:'./client/dev/js/',
  dest_js: './client/build/js',
  component_path: './client/dev/components/',
  dest_component: './client/build/components'
};

gulp.task('default', ['serve']);
// gulp.task('watch', ['sass:watch', 'js:watch', 'browser-sync']);

gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
        server: './',
        port: 8082
    });
    gulp.watch("./client/dev/sass/**/*.scss", ['sass']);
    gulp.watch('client/dev/js/**/*.js', ['js']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src(path.sass_path + '*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        cascade: false
    }))
    .pipe(gulp.dest(path.dest_css))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(path.js_path + '*.js')
   .pipe(concat('global.js'))
   .pipe(gulp.dest(path.dest_js))
   .pipe(filesize())
   .pipe(uglify())
   .pipe(rename('global.min.js'))
   .pipe(gulp.dest(path.dest_js))
   .pipe(filesize())
   .on('error', gutil.log)
   .pipe(browserSync.stream());
});
