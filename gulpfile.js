const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');

const paths = {
  styles : [
    'src/public/styles/**/*.scss',
  ],
  fonts : [
    'src/public/fonts/**/*.*',
  ],
  images : [ 'src/public/images/**/*.*' ],
  scripts : [ 'src/public/scripts/**/*.js' ],
  vendors: {
    base: [ 'node_modules/jquery/dist/jquery.min.js' ],
    scripts: [
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/swiper/swiper-bundle.min.js',
    ]
  }
};

const dest = {
  dist: [ './dist/' ],
  scss: [ './dist/styles/' ],
  fonts: [ './dist/fonts/' ],
  images: [ './dist/images/' ],
  scripts: [ './dist/scripts/' ],
  libs: [ './dist/scripts/libs/' ],
  statics: [ './dist/images/statics' ],
};

function styles() {
  return gulp.src(paths.styles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dest.scss));
}

function images() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(dest.images));
}
function fonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(dest.fonts));
}

function scripts () {
  return gulp.src(paths.scripts)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(dest.scripts));
}

function baseScripts () {
  return gulp.src(paths.vendors.base)
    .pipe(gulp.dest(dest.libs));
}

function vendorScripts() {
  return gulp.src(paths.vendors.scripts)
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(dest.libs));
}

function cleanFolder() {
  return gulp.src(`${dest.dist}`, { allowEmpty: true })
    .pipe(clean({ force: true }));
}

function watch () {
  gulp.watch(paths.styles, { usePolling: true }, styles);
  gulp.watch(paths.images, { usePolling: true }, images);
  gulp.watch(paths.fonts, { usePolling: true }, fonts);
  gulp.watch(paths.scripts, { usePolling: true }, scripts);
}

gulp.task('build', gulp.series(cleanFolder, gulp.parallel(styles, images, fonts, scripts, baseScripts, vendorScripts )));
gulp.task('dev', gulp.series('build', watch));
gulp.task('default', gulp.series('build'));
