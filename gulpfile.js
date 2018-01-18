const gulp = require('gulp'),
      gutil = require('gulp-util'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      pug = require('gulp-pug'),
      scss = require('gulp-sass'),
      browsersync = require('browser-sync').create(),
      sourcemaps = require('gulp-sourcemaps');

const Paths = {

    SRC: 'src/',
    CSS: 'src/css/*.css',
    SCSS: 'src/scss/styles.scss',
    SCSS_ALL: 'src/scss/**/*.scss',
    PUG: 'src/pug/*.pug',
    PUG_LIB: 'src/pug/**/*.pug',
    JS: 'src/js/**/*.*',
    IMAGES: 'src/images/*.*',
    FONTS: 'src/fonts/*.*',

    DIST: 'dist',
    DIST_CSS: 'dist/css',
    DIST_JS: 'dist/js',
    DIST_IMAGES: 'dist/images',
    DIST_FONTS: 'dist/fonts'
}


/*
	scss
----------------------------------------------------*/
gulp.task('scss', () => {
    return gulp.src(Paths.SCSS)
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: 'expanded'
        }).on('error', scss.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(Paths.DIST_CSS))
        .pipe(browsersync.reload({ stream: true }))
});


/*
	CSS
----------------------------------------------------*/
gulp.task('css', () => {
    return gulp.src(Paths.CSS)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(Paths.DIST_CSS))
        .pipe(browsersync.reload({ stream: true }))
});


/*
	JAVASCRIPT
----------------------------------------------------*/
gulp.task('js', () => {
    return gulp.src(Paths.JS)
        .pipe(gulp.dest(Paths.DIST_JS))
        .pipe(browsersync.reload({ stream: true }))
});

/*
	PUG
----------------------------------------------------*/
gulp.task('pug', () => {
    gulp.src(Paths.PUG)
        .pipe(pug({ pretty: true })
            .on('error', gutil.log))
        .pipe(gulp.dest(Paths.DIST))
        .pipe(browsersync.reload({ stream: true }))
});

/*
	IMAGES
----------------------------------------------------*/
gulp.task('images', () => {
    gulp.src(Paths.IMAGES)
        .pipe(gulp.dest(Paths.DIST_IMAGES))
        .pipe(browsersync.reload({ stream: true }))
});


/*
	FONTS
----------------------------------------------------*/
gulp.task('fonts', () => {
    gulp.src(Paths.FONTS)
        .pipe(gulp.dest(Paths.DIST_FONTS))
});


/*
	CLEAN-DIST

	Remove all subfolders and files
	from distribution folder
----------------------------------------------------*/
gulp.task('clean-dist', () => {
    return del([
        Paths.DIST + '/**/*'
    ])
});


/*
	SERVER
	
	see options at https://browsersync.io/docs/options
----------------------------------------------------*/
gulp.task('server', ['pug', 'scss', 'js', 'images'], () => {
    browsersync.init({
        server: Paths.DIST,
        port: 8000,
        ui: {
            port: 8080
        },
        notify: false
    })
});


gulp.task('watch', () => {
    // gulp.watch(Paths.SCSS, ['scss']);
    gulp.watch(Paths.SCSS_ALL, ['scss']);
    gulp.watch(Paths.JS, ['js']);
    gulp.watch(Paths.PUG, ['pug']);
    gulp.watch(Paths.PUG_LIB, ['pug']);
    gulp.watch(Paths.IMAGES, ['images']);
});

gulp.task('default', [
    'pug',
    'js',
    'scss',
    'images',
    'watch',
    'server'
]);
