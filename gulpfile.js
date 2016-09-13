//npm install gulp-htmlmin gulp-imagemin imagemin-pngcrush gulp-clean-css gulp-jshint gulp-uglify gulp-concat gulp-rename gulp-notify gulp-base64 gulp-clean gulp-sourcemaps gulp-sass lite-server --save-dev
"use strict";

/* 环境信息 */
var source = 'src',
    develop = 'develop',
    production = 'production';

var config = {
    debug: true,
    buildPath: ""
};

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    base64 = require('gulp-base64'),//图片转base64
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-clean-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    sourcemaps = require('gulp-sourcemaps'),//map文件,用于调试
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    clean = require('gulp-clean');//清除文件


gulp.task("copy", function () {
    config.buildPath = production;
    return gulp.src(['./' + source + '/*.ico', './' + source + '/styles/fonts/*'])
        .pipe(gulp.dest('./' + config.buildPath + '/styles/fonts'))
        .pipe(notify({ message: 'copy task ok' }));
});


// 压缩图片
gulp.task('img', function () {
    return gulp.src(['./' + source + '/images/*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./' + config.buildPath + '/images/'))
        .pipe(notify({ message: 'img task ok' }));
});

// 压缩html
gulp.task('html', function () {
    return gulp.src('./' + source + '/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./' + config.buildPath + '/'))
        .pipe(notify({ message: 'html task ok' }));

});

// 合并、压缩、重命名css
gulp.task('css', function () {
    return gulp.src('./' + source + '/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('css.css'))
        .pipe(base64({ extensions: ['png', 'jpg', 'jpeg', 'gif'], maxImageSize: 10 * 1024, debug: false }))
        //.pipe(gulp.dest('dest/css'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.', {
            debug: config.debug,
            charset: "utf8",
            addComment: config.debug //是否在浏览器启用map文件
        }))
        .pipe(gulp.dest('./' + config.buildPath + '/styles'))
        .pipe(notify({ message: 'css task ok' }));
});

// 检查js
gulp.task('hint', function () {
    return gulp.src('./' + source + '/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function () {
    return gulp.src(['./' + source + '/js/**/*.js'])
        .pipe(sourcemaps.init())
        //.pipe(concat('all.js'))
        //.pipe(gulp.dest('dest/js'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {
            debug: config.debug,
            charset: "utf8",
            addComment: config.debug //是否在浏览器启用map文件
        }))
        .pipe(gulp.dest('./' + config.buildPath + '/js'))
        .pipe(notify({ message: 'js task ok' }));
});

// 清理
gulp.task('clean', function () {
    return gulp.src([source + '/dist/styles/*.css', source + '/dist/**/*.{map,js,html}', source + '/dist/images/*'], { read: false })
        .pipe(clean());
});

//开发环境
gulp.task('default', ['clean'], function () {
    config.debug = true;
    config.buildPath = develop;
    gulp.start('copy', 'img', 'css', 'hint', 'js', 'html', function () {
        gulp.watch('./' + source + '/images/*', ['img']);
        gulp.watch('./' + source + '/*.html', ['html']);
        gulp.watch('./' + source + '/styles/*.css', ['css']);
        gulp.watch('./' + source + '/**/*.js', ['hint', 'js']);
    });
});

//生产环境
gulp.task('production', ['clean'], function () {
    config.debug = false;
    config.buildPath = production;
    gulp.start('copy', 'img', 'css', 'hint', 'js', 'html', function () {
        gulp.src([config.buildPath + '/**/*.map']).pipe(clean());
    });
});

