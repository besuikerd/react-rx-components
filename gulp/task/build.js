var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback){
    runSequence(
      ['lint', 'clean'],
      'webpack:build',
      callback
    );
});
