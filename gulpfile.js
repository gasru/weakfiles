/* eslint-env node, es6 */
var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('buildit', function() {
  sequence(['clear', 'dotClasp', 'envJs', 'build', 'build:client', 'rmClasp']);
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

gulp.task('clear', function() {
  sequence(['clearDist', 'rmClasp']);
});
gulp.task('rmClasp', function() {
  return del.sync('./.clasp.json');
});
gulp.task('clearDist', function() {
  return del.sync('./dist');
});

gulp.task('build', build);

function build() {
  gulp
    .src(
      [
        './src/server/**',
        './src/ui/**',
        './src/appsscript.json',
        './src/client/**/*.html'
      ],
      {
        base: './src'
      }
    )
    .pipe(gulp.dest('dist'));
}

gulp.task('build:client', function() {
  gulp
    .src('./src/client/**/*.js')
    .pipe(concat('bundle.js.html'))
    .pipe(replace(/((.|\n|\r)*)/, '<script>\n$1</script>'))
    .pipe(gulp.dest('./dist/client'));
});
