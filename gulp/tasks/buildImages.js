var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

module.exports = function() {
    gulp.src([
        './public/images/**/*.*'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'));
};