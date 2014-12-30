/*jshint globalstrict: true*/
/*global require*/
'use strict';
var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('default', ['watch']);

var livereloadFiles = [
    '*.css',
    '*.js',
    '*.html',
    '*.php'
];

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch(livereloadFiles, function (file) {
        server.changed(file.path);
    });
});
