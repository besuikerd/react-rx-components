var gulp = require('gulp');
var sass = require('gulp-sass');
var src = require('../conf/src');

gulp.task('sass', function(){
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css));
});