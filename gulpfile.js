/*
* TODO
*
* 1. Change sprite library to
*    https://github.com/Ensighten/spritesmith
*
* 2. (?) Remove browserify (uglify)
*
* 3. Generate source maps for js&css
*
**/

/* main */
var app = require('./app');
var gulp = require('gulp');

/* util */
var _if = require('gulp-if');
var replace = require('gulp-replace');

/* images */
var sprite = require('css-sprite').stream;
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

/* browser */
var reload = browserSync.reload;

/* styles */
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

/* js */
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

/* html */
var include = require('gulp-file-include');

/* ==============================================
    Bootstrap
============================================== */

gulp.task('default', ['server', 'browserSync', 'sprite', 'base64', 'styles', 'js', 'html'], function() {
    gulp.watch('./src/styles/**/*.styl', ['styles']);
    gulp.watch('./src/images/sprite/*.png', ['sprite']);
    gulp.watch('./src/images/inline/*.png', ['base64']);
    gulp.watch(['./src/js/**/*.js', '!./public/js/app.js'], ['js']);
    gulp.watch('./src/html/**/*.html', ['html']);
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

gulp.task('styles', function() {
    gulp.src('./src/styles/app.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer > 8'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    Generate sprite & stylus stylesheet
    Generate stylesheet with inline images
============================================== */

gulp.task('sprite', function() {
    gulp.src('./src/images/sprite/*.*')
        .pipe(sprite({
            name: 'elements',
            style: 'sprite.styl',
            cssPath: './../images/compiled',
            processor: 'stylus'
        }))
        .pipe(_if('*.png', gulp.dest('./public/images/compiled'), gulp.dest('./src/styles/includes/')))
        .pipe(reload({stream:true}));
});

gulp.task('base64', function() {
    gulp.src('./src/images/inline/*.*')
        .pipe(sprite({
            base64: true,
            style: 'inline.styl',
            processor: 'stylus'
        }))
        .pipe(gulp.dest('./src/styles/includes/'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    JS compile
============================================== */

gulp.task('js', function() {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/js/app.js'])
        .pipe(browserified)
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    Reload server on html update
============================================== */

gulp.task('html', function() {
    gulp.src('./src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('./views/'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    Building project
============================================== */

gulp.task('build', [
    'sprite',
    'base64',
    'styles',
    'html',
    'buildHTML',
    'buildCSS',
    'buildImages',
    'buildJS',
    'buildFonts'
]);

gulp.task('buildHTML', function() {
    gulp.src('./views/*.html')
        .pipe(replace('/styles/', './styles/'))
        .pipe(replace('/js/', './js/'))
        .pipe(replace('/images/', './images/'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('buildCSS', function() {
    gulp.src('./public/styles/app.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
});

gulp.task('buildImages', function() {
    gulp.src([
        './public/images/**/*.*',
        '!./public/images/inline/*.*',
        '!./public/images/sprite/*.*'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'));
});

gulp.task('buildJS', function() {
    gulp.src('./public/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('buildFonts', function() {
    gulp.src('./public/fonts/*.*')
        .pipe(gulp.dest('./build/fonts/'));
});