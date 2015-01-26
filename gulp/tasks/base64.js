var gulp = require('gulp');
var reload = require('browser-sync').reload;
var sprite = require('css-sprite').stream;

module.exports = function() {
    gulp.src('./src/images/inline/*.*')
        .pipe(sprite({
            base64: true,
            style: 'inline.styl',
            processor: 'stylus'
        }))
        .pipe(gulp.dest('./src/styles/includes/'))
        .pipe(reload({stream:true}));
};