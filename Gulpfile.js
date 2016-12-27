/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

const FILES_FOR_DEV_SERVER_TO_WATCH = [ 'build/**/*.js', 'package.json' ];
const FILES_TO_LINT = [ './**/*.js', '!dist/', '!node_modules/'];

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

gulp.task('dev-server', () => {
  return nodemon({
    script: 'build/dev-server.js',
    watch: FILES_FOR_DEV_SERVER_TO_WATCH
  });
});

gulp.task('dev', gulp.parallel('lint-watch', 'dev-server'));
