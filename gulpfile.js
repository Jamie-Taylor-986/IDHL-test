const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Paths
const paths = {
    scss: './scss/**/*.scss',
    css: './css',
    html: './*.html',
    js: './*.js'
};

// SCSS compilation
function compileSass() {
    return gulp.src(paths.scss)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream()); // inject changes
}

// Watch & serve
function serve() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000,
        open: true
    });

    gulp.watch(paths.scss, compileSass).on('change', browserSync.reload); ; // watch SCSS
    gulp.watch(paths.html).on('change', browserSync.reload); // watch HTML
    gulp.watch(paths.js).on('change', browserSync.reload);   // watch JS
}

// Default task
exports.default = gulp.series(compileSass, serve);
