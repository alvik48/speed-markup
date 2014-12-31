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
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var ejs = require('gulp-ejs');
var replace = require('gulp-replace');

/* ==============================================
    Bootstrap
============================================== */

gulp.task('default', ['server', 'browserSync', 'sprite', 'base64', 'less', 'js'], function() {
    gulp.watch('./public/styles/**/*.less', ['less']);
    gulp.watch('./public/images/sprite/*.png', ['sprite']);
    gulp.watch('./public/images/inline/*.png', ['base64']);
    gulp.watch(['./public/js/**/*.js', '!./public/js/app.js'], ['js']);
    gulp.watch('./views/**/*.html', ['ejs']);
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
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    Generate sprite & less stylesheet
    Generate stylesheet with inline images
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
    JS compile
============================================== */

gulp.task('js', function() {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./public/js/main.js'])
        .pipe(browserified)
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({stream:true}));
});

/* ==============================================
    Reload server on ejs update
============================================== */

gulp.task('ejs', function() {
    gulp.src('./views/**/*.html')
        .pipe(reload({stream:true}));
});

/* ==============================================
    Building project
============================================== */

gulp.task('build', [
    'sprite', 'base64', 'less',
    'buildHTML',
    'buildCSS',
    'buildImages',
    'buildJS',
    'buildFonts'
]);

gulp.task('buildHTML', function() {
    gulp.src('./views/*.html')
        .pipe(ejs())
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