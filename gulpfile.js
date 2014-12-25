var app = require('./app');
var gulp = require('gulp');
var _if = require('gulp-if');
var rename = require('gulp-rename');

var sprite = require('css-sprite').stream;
var imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var browserify = require('browserify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var ejs = require('gulp-ejs');

/* ==============================================
    Bootstrap
============================================== */

gulp.task('default', ['server', 'browserSync', 'sprite', 'base64', 'less'], function() {
    gulp.watch('./public/styles/**/*.less', ['less']);
    gulp.watch('./public/images/sprite/*.png', ['sprite']);
    gulp.watch('./public/images/inline/*.png', ['base64']);
});

/* ==============================================
    Building project
============================================== */

gulp.task('build', [
    'sprite', 'base64', 'less',
    'buildHTML',
    'buildCSS',
    'buildImages',
    'buildJS'
]);

gulp.task('buildHTML', function() {
    gulp.src('./views/*.html')
        .pipe(ejs())
        .pipe(gulp.dest('./build/'));
});

gulp.task('buildCSS', function() {
    gulp.src('./public/styles/app.css')
        .pipe(gulp.dest('./build/styles/'));
});

gulp.task('buildImages', function() {
    gulp.src([
        './public/images/**/*.*',
        '!./public/images/inline/*.*',
        '!./public/images/sprite/*.*'
    ])
        .pip(imagemin())
        .pipe(gulp.dest('./build/images/'));
});

gulp.task('buildJS', function() {
    gulp.src('./public/js/**/*.*')
        .pipe(gulp.dest('./build/js/'));
});

/* ==============================================
    Start live reload server
============================================== */

gulp.task('server', function() {
    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });
});

gulp.task('browserSync', function() {
    browserSync({
        proxy: "http://localhost:3000/"
    });
});

/* ==============================================
    Less compile
============================================== */

gulp.task('less', function() {
    gulp.src('./public/styles/app.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer > 8'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    Generate sprite & less stylesheet
============================================== */

gulp.task('sprite', function() {
    gulp.src('./public/images/sprite/*.*')
        .pipe(sprite({
            name: 'elements',
            style: 'sprite.less',
            cssPath: './../images/compiled',
            processor: 'less'
        }))
        .pipe(_if('*.png', gulp.dest('./public/images/compiled'), gulp.dest('./public/styles/includes/')))
        .pipe(reload({stream:true}));
});

gulp.task('base64', function() {
    gulp.src('./public/images/inline/*.*')
        .pipe(sprite({
            base64: true,
            style: 'inline.less',
            processor: 'less'
        }))
        .pipe(gulp.dest('./public/styles/includes/'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    JS compile TODO
============================================== */