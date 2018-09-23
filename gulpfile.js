/* eslint-env node, es6 */
var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('buildit', function() {
  sequence('clear', 'dotClasp', 'envJs', 'build', 'rmClasp');
});

gulp.task('dotClasp', function() {
  var claspPath = process.env.CLASPPATH;
  claspPath += claspPath.endsWith('/') ? '' : '/';
  gulp.src(`${claspPath}.clasp.json`).pipe(gulp.dest('./'));
});

gulp.task('envJs', function() {
  var claspPath = process.env.CLASPPATH;
  claspPath += claspPath.endsWith('/') ? '' : '/';
  gulp.src(`${claspPath}*.js`).pipe(gulp.dest('./dist'));
});

gulp.task('clear', clear);
gulp.task('rmClasp', rmClasp);

gulp.task('build', build);

function clear() {
  del('./dist');
  rmClasp();
}

function rmClasp() {
  del('./.clasp.json');
}

function build() {
  gulp.src('./src/*').pipe(gulp.dest('dist'));
}
