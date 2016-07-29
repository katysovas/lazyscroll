var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var path = {js: './dist/build.js', all: './dist/**/*', dest: './dist/'}

gulp.task('build', function(){
	return gulp.src('./js/Main.jsx')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(path.dest))
})

gulp.task('minify', ['build'], function(cb) {
	return gulp.src(path.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.dest))
});