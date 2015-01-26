var gulp = require('gulp');
var reload = require('browser-sync').reload;
var transform = require('vinyl-transform');
var browserify = require('browserify');

module.exports = function() {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/js/app.js'])
        .pipe(browserified)
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({stream:true}));
};