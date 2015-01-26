var gulp = require('gulp');
var reload = require('browser-sync').reload;
var include = require('gulp-file-include');

module.exports = function() {
    gulp.src('./src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('./views/'))
        .pipe(reload({stream:true}));
};