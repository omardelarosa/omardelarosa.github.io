/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const webpack = require('gulp-webpack');

const FILES_FOR_DEV_SERVER_TO_WATCH = [
  'build/**/*.js',
  'package.json',
  '!assets/',
  '!dist/'
];

const FILES_TO_LINT = [
  'src/**/*.js',
  'build/**/*.js',
  '!src/styles/',
];

const FILES_FOR_WEBPACK_TO_WATCH = [
  'src/',
  'assets/',
  'build/',
  'config/',
  'templates/'
];

gulp.task('lint', () => {
  return gulp.src(FILES_TO_LINT)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint-no-fail', () => {
  return gulp.src(FILES_TO_LINT)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint-watch', () => gulp.watch(FILES_TO_LINT, gulp.series('lint-no-fail')));

gulp.task('webpack-prod', () => {
  return gulp.src('src/main.js')
    .pipe(webpack(require('./build/prod.webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev', () => {
  return gulp.src('src/main.js')
    .pipe(webpack(require('./build/dev.webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('lint', 'webpack-prod'));

gulp.task('webpack-dev-watch', () => gulp.watch(FILES_FOR_WEBPACK_TO_WATCH, gulp.series('webpack-dev')));

gulp.task('dev-server', () => {
  return nodemon({
    script: 'build/dev-server.js',
    watch: FILES_FOR_DEV_SERVER_TO_WATCH
  });
});

gulp.task('dev', gulp.parallel('lint-watch', 'webpack-dev', 'dev-server', 'webpack-dev-watch'));

