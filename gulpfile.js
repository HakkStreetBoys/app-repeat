var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var rename = require('gulp-rename')

var input = './public/sass/**/*.scss'
var output = './public/css'

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded',
}

gulp.task('default', ['sass', 'watch'])

gulp.task('sass', function() {
	return gulp
		.src(input)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest(output))
})

gulp.task('watch', function() {
	return (gulp
			.watch(input, ['sass'])
			.on('change', function(event) {
				console.log(
					'File ' + event.path + ' was ' + event.type + ', running tasks...'
				)
			}) )
})

// gulp.task('minify-css', function() {
// 	return gulp
// 		.src('public/css/*.css')
// 		.pipe(
// 			cleanCSS({ debug: true }, function(details) {
// 				console.log(details.name + ': ' + details.stats.originalSize)
// 				console.log(details.name + ': ' + details.stats.minifiedSize)
// 			})
// 		)
// 		.pipe(
// 			rename({
// 				suffix: '.min',
// 			})
// 		)
// 		.pipe(gulp.dest(output))
// })
