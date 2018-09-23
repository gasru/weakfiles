var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('build', function () {
  sequence('clear', 'dotClasp', 'envJs', 'build');
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

gulp.task('build', build);

function clear() {
  del(['./dist', './.clasp.json']);
}

function build() {
  gulp.src('./src/*')
    .pipe(gulp.dest('dist'));
}
