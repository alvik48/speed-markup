var gulp = require('gulp');
var reload = require('browser-sync').reload;

module.exports = function () {
    gulp.src([
        './src/images/**/*.*',
        '!./src/images/sprite/*.*',
        '!./src/images/inline/*.*'
    ])
        .pipe(gulp.dest('./public/images/'))
        .pipe(reload({stream: true}));
};