var gulp = require('gulp');
var eslint = require('gulp-eslint');
var src = require('../conf/src');

gulp.task('lint', function(){
    return gulp.src(`${src.js}/**/*.js`)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

