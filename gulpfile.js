var gulp = require('gulp');
var rsequence = require('run-sequence');
var _$ = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return gulp.src('./tmp')
    .pipe(_$.clean());
});

gulp.task('build', ['clean'], function() {
  rsequence('chrome');
});

gulp.task('dist', function() {
  rsequence('build', 'chrome:zip');
});

gulp.task('chrome', ['chrome:js', 'chrome:css', 'chrome:img'], function() {
  return gulp.src('./src/chrome/*')
    .pipe(gulp.dest('./tmp/chrome'))
});

gulp.task('chrome:js', function () {
  return universalFile('chrome', 'js');
});

gulp.task('chrome:css', function () {
  return universalFile('chrome', 'css');
});

gulp.task('chrome:img', function () {
  return universalFile('chrome', 'img');
});

gulp.task('chrome:zip', function() {
  return gulp.src('./tmp/chrome/**/*')
    .pipe(_$.zip('chrome.zip'))
    .pipe(gulp.dest('./dist'));
});

function universalFile(folderName, files) {
  return gulp.src('./src/' + files + '/*')
    .pipe(gulp.dest('./tmp/' + folderName + '/' + files));
}