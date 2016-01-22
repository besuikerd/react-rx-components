var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(callback){
  del('dist/*').then(function(){callback()});
});