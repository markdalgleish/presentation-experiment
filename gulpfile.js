var pkg = require('./package.json'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  browserify = require('gulp-browserify'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  rework = require('gulp-rework'),
  reworkNpm = require('rework-npm'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush'),
  through = require('through'),
  opn = require('opn'),
  ghpages = require('gh-pages'),
  path = require('path'),
  isDev = process.argv.indexOf('dev') > 0;

gulp.task('js', function() {
  return gulp.src('src/scripts/main.js')
    .pipe(plumber())
    .pipe(browserify({ transform: ['debowerify'], debug: isDev }))
    .pipe(isDev ? through() : uglify())
    .pipe(rename('build.js'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('src/index.jade')
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src('src/styles/main.css')
    .pipe(plumber())
    .pipe(rework(reworkNpm(), { sourcemap: isDev }))
    .pipe(autoprefixer('last 2 versions', { map: false }))
    .pipe(isDev ? through() : minifycss())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(isDev ? through() : imagemin({ progressive: true, use: [pngcrush()] }))
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('serve', function(done) {
  connect.server({
    root: 'dist',
    livereload: true
  });

  opn('http://localhost:8080', done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/styles/**/*.css', ['css']);
  gulp.watch('src/scripts/**/*.js', ['js']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('deploy', function(done) {
  ghpages.publish({
    base: path.join(__dirname, 'dist'),
    logger: console.log.bind(console)
  }, done);
});

gulp.task('build', ['clean', 'js', 'html', 'css', 'images']);
gulp.task('dev', ['build', 'watch', 'serve']);
gulp.task('default', ['build']);
