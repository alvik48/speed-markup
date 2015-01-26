var gulp = require('gulp');
var _if = require('gulp-if');
var reload = require('browser-sync').reload;
var sprite = require('css-sprite').stream;

module.exports = function() {
    gulp.src('./src/images/sprite/*.*')
        .pipe(sprite({
            name: 'elements',
            style: 'sprite.styl',
            cssPath: './../images/compiled',
            processor: 'stylus'
        }))
        .pipe(_if('*.png', gulp.dest('./public/images/compiled'), gulp.dest('./src/styles/includes/')))
        .pipe(reload({stream:true}));
};