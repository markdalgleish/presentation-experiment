var pkg = require('./package.json'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  browserify = require('gulp-browserify'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush'),
  through = require('through'),
  opn = require('opn'),
  ghpages = require('gh-pages'),
  path = require('path'),
  isDev = process.argv.indexOf('serve') > 0;

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
  return gulp.src('src/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      // Allow CSS to be imported from bower_components
      'include css': true,
      'paths': ['./bower_components']
    }))
    .pipe(autoprefixer('last 2 versions', { map: false }))
    .pipe(isDev ? through() : minifycss())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(isDev ? through() : imagemin({ progressive: true, use: [pngcrush()] }))
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('clean:images', function() {
  return gulp.src('dist/images', { read: false })
    .pipe(clean());
});

gulp.task('preview', ['build'], function(done) {
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

gulp.task('deploy', ['build'], function(done) {
  ghpages.publish({
    base: path.join(__dirname, 'dist'),
    logger: console.log.bind(console)
  }, done);
});

gulp.task('build', ['js', 'html', 'css', 'images']);
gulp.task('serve', ['preview', 'watch']);
gulp.task('default', ['clean', 'build']);
