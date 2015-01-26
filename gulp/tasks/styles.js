var gulp = require('gulp');
var reload = require('browser-sync').reload;
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function() {
    gulp.src('./src/styles/app.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer > 8'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({stream:true}));
};