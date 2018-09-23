var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('default', function () {
  sequence('clear', 'dotClasp', 'envJs');
});

gulp.task('dotClasp', function () {
  var claspPath = process.env.CLASPPATH;
  claspPath += claspPath.endsWith('/') ? '' : '/';
  gulp.src(`${claspPath}.clasp.json`).pipe(gulp.dest('./'));
});

gulp.task('envJs', function () {
  var claspPath = process.env.CLASPPATH;
  claspPath += claspPath.endsWith('/') ? '' : '/';
  gulp.src(`${claspPath}*.js`).pipe(gulp.dest('./dist'));
});

gulp.task('clear', clear);

function clear() {
  del(['./.clasp.json', './dist']);
}
