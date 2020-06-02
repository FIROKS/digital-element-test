/* stylelint-disable*/
/* eslint-disable*/

"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var vhCorrection = require('postcss-viewport-height-correction');
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var critical = require('critical').stream;
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var imageminMozjpeg = require('imagemin-mozjpeg');
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var minify = require('gulp-minify');
var webp = require('gulp-webp');

gulp.task('js', function() {
  return gulp.src(["./source/js/*.js"])
    .pipe(minify())
    .pipe(gulp.dest('./build/js'))
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), vhCorrection()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icons/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/img/**/*.{jpg,png,svg}", gulp.series("copy", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest('source/img'));
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imageminMozjpeg({
        quality: 75
    }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icons/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img/icons"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/video/*.mp4",
    // "source/js/*-min.js",
    // "source/js/*.js",
    "source//*.ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('critical', function () {
  return gulp.src('build/**/*.html')
    .pipe(critical({
      base: 'build/',
      inline: true,
      minify: true,
      extract: true,
      css: ['build/css/style.min.css']
    }))
    .on('error', function(err) { log.error(err.message); })
    .pipe(gulp.dest('build'));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "sprite",
  "css",
  "html",
  "js"));
gulp.task("js", gulp.series("js"));
gulp.task("start", gulp.series("build", "server"));

gulp.task("final", gulp.series("build", 'critical'));
