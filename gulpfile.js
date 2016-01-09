var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var argv        = require('yargs').argv;

var buildDir = argv.app || '';
var srcDir   = './src/' + buildDir;
var destDir  = './build/' + buildDir;

var paths = {
    src: {
      less : srcDir + '/**/*.less',
      img: srcDir + '/**/img/**',
      html: srcDir + '/**/*.html',
      js: srcDir + '/**/*.js'
    },
    dest: destDir
}

gulp.task('less', function() {
    return gulp.src(paths.src.less)
        .pipe(less())
        .on('error', function(err) {
          console.log('Less Error!', err.message);
        })
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
});

gulp.task('img', function () {
  gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.dest));
});

gulp.task('js', function () {
  gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.dest));
});

gulp.task('html', function () {
  gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync',['html','less','img','js'], function() {
    browserSync.init({
        server: {
            baseDir: paths.dest
        }
    });
});

gulp.task('watch', function () {
  gulp.watch([paths.src.js], ['js']);
  gulp.watch([paths.src.less], ['less']);
  gulp.watch([paths.src.img], ['img']);
  gulp.watch([paths.src.html], ['html']);
});

gulp.task('default', ['browser-sync', 'watch']);