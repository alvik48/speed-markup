var gulp = require('gulp');

module.exports = function() {
    gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('./public/fonts/'));
};