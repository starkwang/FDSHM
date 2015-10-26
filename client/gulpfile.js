var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
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
    connect = require('gulp-connect');;
gulp.task('default', ['clean', 'scripts', 'libs', 'sass', 'sass:watch', 'Imagemin', 'watch', 'webserver']);
gulp.task('scripts', function() {
    return gulp.src([ 'src/js/ngClipBoard.js','src/js/app.js','src/js/*Service.js', 'src/js/*Controller.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});
gulp.task('libs', function() {
    return gulp.src(['src/lib/csv.min.js','src/lib/fastclick.js', 'src/lib/data.js', 'src/lib/jquery.js','src/lib/jquery-qrcode.js','src/lib/angular.min.js', 'src/lib/angular-route.min.js', 'src/lib/angular-css.js','src/lib/angular-animate.min.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('build/lib'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/lib'))
        .pipe(notify({
            message: 'Libs task complete'
        }));
});

gulp.task('sass', function() {
    gulp.src(['src/style/animate.scss','src/style/collection.scss','src/style/forum.scss','src/style/all.scss','src/style/animation.scss','src/style/base.scss','src/style/reset.scss','src/style/ui-override.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('base.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
    gulp.src(['src/style/main.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/style/*.scss', ['sass']);
});
gulp.task('webserver', function() {
    connect.server();
});
gulp.task('Imagemin', function() {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});
gulp.task('clean', function() {
    return gulp.src(['build/js', 'build/css'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
});
