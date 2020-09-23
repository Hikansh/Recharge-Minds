const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
var deploy = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function() {
  return gulp.src('./build/**/**').pipe(deploy());
});

function styles() {
  return gulp
    .src('./src/scss/style.scss')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
}

const jsFiles = [
  './node_modules/slick-carousel/slick/slick.min.js',
  './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
  './src/external/panelmenu/panelmenu.js',
  './src/external/air-datepicker-master/dist/js/datepicker.min.js',
  './src/external/perfect-scrollbar/perfect-scrollbar.min.js',

  './node_modules/imagesloaded/imagesloaded.pkgd.min.js',
  './src/external/bootstrap/js/bootstrap.min.js',
  './node_modules/lazysizes/lazysizes.min.js',
  './node_modules/lazysizes/plugins/bgset/ls.bgset.min.js',

  './src/external/form/jquery.form.js',
  './src/external/form/jquery.validate.min.js',
  './src/external/form/jquery.form-init.js',
  './src/js/**/*.js',
];

function scripts() {
  return gulp
    .src(jsFiles, { allowEmpty: true })
    .pipe(concat('bundle.js'))
    .pipe(
      uglify({
        toplevel: true,
      })
    )
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}
function clean() {
  return del(['build/*']);
}
function html() {
  return gulp
    .src('./src/*.html')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
}
function external() {
  return gulp
    .src('./src/external/**/*')
    .pipe(gulp.dest('./build/external/'))
    .pipe(browserSync.stream());
}
function font_icons() {
  return gulp
    .src('./src/font-icons/**/*')
    .pipe(gulp.dest('./build/font-icons/'))
    .pipe(browserSync.stream());
}
function separate_include() {
  return gulp
    .src('./src/separate-include/**/*')
    .pipe(gulp.dest('./build/separate-include/'))
    .pipe(browserSync.stream());
}
function scss() {
  return gulp
    .src('./src/scss/*')
    .pipe(gulp.dest('./build/scss/'))
    .pipe(browserSync.stream());
}
function ajaxContent() {
  return gulp
    .src('./src/ajax-content/*')
    .pipe(gulp.dest('./build/ajax-content/'))
    .pipe(browserSync.stream());
}
function img() {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./build/images/'))
    .pipe(browserSync.stream());
}
function watch() {
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp
    .watch('./src/**/*.html', gulp.series(html))
    .on('change', browserSync.reload);
}
gulp.task('styles', styles);
gulp.task('html', html);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('img', img);
gulp.task('external', external);
gulp.task('font_icons', font_icons);
gulp.task('separate_include', separate_include);

gulp.task('ajaxContent', ajaxContent);
gulp.task('watch', watch);
gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.parallel(
      styles,
      external,
      font_icons,
      separate_include,
      scss,
      ajaxContent,
      img,
      scripts,
      html
    )
  )
);
gulp.task('dev', gulp.series('build', 'watch'));

gulp.task('html-minify', () => {
  return gulp
    .src('./build/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build/'));
});
