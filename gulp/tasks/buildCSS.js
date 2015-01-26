var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');

module.exports = function() {
    gulp.src('./public/styles/app.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
};