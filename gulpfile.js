'use strict';

var gulp            = require('gulp');
var less            = require('gulp-less');
var plumberNotifier = require('gulp-plumber-notifier');
var rename          = require('gulp-rename');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var mqpacker        = require('css-mqpacker');
var uglify          = require('gulp-uglify');
var browserSync     = require('browser-sync').create();
var ghPages         = require('gulp-gh-pages');
var pug             = require('gulp-pug');
var argvs           = require('yargs').argv;
var svgSprite       = require('gulp-svg-sprite');
var svgo            = require('gulp-svgo');
var svgmin          = require('gulp-svgmin');

//paths
var basePaths = {
    src: 'src/',
    dest: 'www/'
};

var paths = {
    images: {
        src: basePaths.src + 'images/',
        dest: basePaths.dest + 'images/'
    },
    scripts: {
        src: basePaths.src + 'scripts/',
        dest: basePaths.dest + 'scripts/'
    },
    styles: {
        src: basePaths.src + 'less/',
        dest: basePaths.dest + 'styles/'
    },
    html: {
        src: basePaths.src + 'pug/',
        dest: basePaths.dest + 'html/'
    },
    svg: {
        src: basePaths.src + 'svg/',
        dest: basePaths.dest + 'svg/'
    }
};

var files = {
    styles: paths.styles.src + 'style.less',
    scripts: paths.scripts.src + '**/*.js',
    html: paths.html.src + '**/*.pug',
    svg: paths.svg.src + '**/*.svg'
};

//build

gulp.task('build', [
    'less',
    'pug',
    'js',
    'svg-sprite'
]);


// Компиляция LESS
gulp.task('less', function () {
    return gulp.src(files.styles)
        .pipe(plumberNotifier())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({browsers: ['last 2 version']}),
            mqpacker
        ]))
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
});

// Компиляция PUG
gulp.task('pug', function buildHTML() {
    return gulp.src(files.html)
        .pipe(plumberNotifier())
        .pipe(pug())
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
});

// сборка js
gulp.task('js', function () {
    gulp.src(files.scripts)
        .pipe(plumberNotifier())
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
});

//сборка svg спрайта
gulp.task('svg-sprite', function() {
    return gulp.src(files.svg)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    prefix: '.b-icon__',
                    dest: '',
                    dimensions: '',
                    sprite: 'sprite.svg',
                    example: false
                }
            },
            svg: {
                xmlDeclaration: false,
                doctypeDeclaration: false,
                rootAttributes: {
                    class: 'b-icons__svg'
                },
                namespaceClassnames: false
            }
        }))
        .pipe(gulp.dest(paths.svg.dest));
});

// деплоер на github.io
gulp.task('deploy', function () {
    return gulp.src(basePaths.dest + '/**/*')
        .pipe(ghPages());
});

// запуск браузерсинка + компилятора less
gulp.task('watch', ['less'], function () {

    if (argvs.dev) {
        browserSync.init({
            server: {
                baseDir: basePaths.dest,
                index: '/html/index.html'
            }
        });
    } else {
        browserSync.init({
            server: {
                baseDir: basePaths.dest
            }
        });
    }

    //следим за файлами, выполняем таски при изменении файлов
    gulp.watch(paths.styles.src + '**/*.less', ['less']);
    gulp.watch(files.scripts, ['js']);
    gulp.watch(files.html, ['pug']);
    gulp.watch(files.svg, ['svg-sprite']);
});
