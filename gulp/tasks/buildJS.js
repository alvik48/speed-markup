var gulp = require('gulp');
var uglify = require('gulp-uglify');

module.exports = function() {
    gulp.src('./public/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
};