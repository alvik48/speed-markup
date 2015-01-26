'use strict';

var gulp = require('gulp');
var fs = require('fs');
var app = require(__dirname + '/../app');

/* ==============================================
    Register tasks
============================================== */

var tasks = fs.readdirSync(__dirname + '/tasks/');

tasks.forEach(function(task) {
    var taskname = task.split('.')[0];
    gulp.task(taskname, require('./tasks/' + taskname));
});

/* ==============================================
    Default task
============================================== */

gulp.task('default', ['server', 'browserSync', 'sprite', 'base64', 'styles', 'js', 'html'], function() {
    gulp.watch('src/styles/**/*.styl', ['styles']);
    gulp.watch('src/images/sprite/*.png', ['sprite']);
    gulp.watch('src/images/inline/*.png', ['base64']);
    gulp.watch(['src/js/**/*.js', '!public/js/app.js'], ['js']);
    gulp.watch('src/html/**/*.html', ['html']);
});