var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');
gulp.task('default', ['clean', 'watch', 'sass:watch', 'sass', 'webpack']);

gulp.task('sass:watch', function() {
    gulp.watch('src/pages/*/*.scss', ['sass']);
    gulp.watch('src/components/*/*.scss', ['sass']);
});
gulp.task('sass', function() {
    gulp.src(['src/pages/**/*.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('build/pages'));
});
gulp.task('clean', function() {
    return gulp.src(['build/pages'], {
            read: false
        })
        .pipe(clean());
});
gulp.task("webpack", function() {
    return gulp
        .src('./')
        .pipe(webpack(webpackConfig))
        //.pipe(uglify())
        .pipe(gulp.dest('./build/pages'));
});
gulp.task('watch', function() {
    gulp.watch('src/components/**/*.js', ['webpack']);
    gulp.watch('src/pages/**/*.js', ['webpack']);
});
