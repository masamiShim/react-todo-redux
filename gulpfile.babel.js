import gulp from 'gulp';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

gulp.task('build', function () {
    gulp.src('src/js/app.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch('./src/js/*/*.js', ['build']);
    gulp.watch('./*.html', ['bs-reload']);
    gulp.watch('./dist/*/*.+(js|css)', ['bs-reload']);
})