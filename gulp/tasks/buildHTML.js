var gulp = require('gulp');
var replace = require('gulp-replace');

module.exports = function() {
    gulp.src('./views/*.html')
        .pipe(replace('/styles/', './styles/'))
        .pipe(replace('/js/', './js/'))
        .pipe(replace('/images/', './images/'))
        .pipe(gulp.dest('./build/'));
};