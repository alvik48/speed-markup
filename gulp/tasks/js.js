var gulp = require('gulp');
var reload = require('browser-sync').reload;
var include = require('gulp-include');

module.exports = function() {
    return gulp.src(['./src/js/app.js'])
        .pipe(include())
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({stream:true}));
};