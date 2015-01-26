var gulp = require('gulp');

module.exports = function() {
    gulp.src('./public/fonts/*.*')
        .pipe(gulp.dest('./build/fonts/'));
};