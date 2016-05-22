'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const plumberNotifier = require('gulp-plumber-notifier');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanss = require('gulp-cleancss');
const sourcemaps = require('gulp-sourcemaps');
const htmlhint = require('gulp-htmlhint');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

//проверка html кода
gulp.task('htmlhint', function() {
  return gulp.src('./src/html/*.html')
    .pipe(htmlhint({
      "tag-pair": true,
      }))
    .pipe(htmlhint.reporter());
});

// Компиляция LESS
gulp.task('less', function () {
  return gulp.src('./src/less/style.less')
    .pipe(plumberNotifier())
    .pipe(less())
    .pipe(postcss([
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
});

//собиратель в билд
gulp.task('build', function(){
  gulp.src('./src/css/*.css')
    .pipe(cleanss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build/'));
  gulp.src('./src/imgs/**/*.*')
    .pipe(gulp.dest('./build/imgs'));
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/svg/*.svg')
    .pipe(gulp.dest('./build/svg'));
});

// деплоер на github.io
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('clear', function() {
  return gulp.src('build/**')
    .pipe(clean({force:true}));
});

// запуск браузерсинка + компилятора less
gulp.task('serve', ['less'], function(){
  browserSync.init({
    server: "./src"
    });
  //следим за файлами, выполняем задачу less
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});