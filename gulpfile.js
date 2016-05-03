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
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jsmin = require('gulp-jsmin');

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
    //.pipe(livereload());
});
//склейка и минификакия скриптов
//gulp.task('script', function(){
//  return gulp.src('./src/js/*.js')
//    .pipe(concat('all.js'))
//    .pipe(jsmin())
//    .pipe(rename('all.min.js'))
//    .pipe(gulp.dest('./src/js'));
//  });

//собиратель в билд
gulp.task('build', function(){
  gulp.src('./src/css/*.css')
    .pipe(cleanss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
  gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./build/html'));
  gulp.src('./src/imgs/**/*.*')
    .pipe(gulp.dest('./build/imgs'));
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/svg/*.svg')
    .pipe(gulp.dest('./build/svg'));
  });

//поднятие сервера
gulp.task('connect', function() {
  connect.server({
    //root: 'src/html',
    livereload: true
    });
});

// Вотчер 
gulp.task('watch', ['connect'], function() {
    gulp.watch('src/less/**/*.less', ['less']);
    });