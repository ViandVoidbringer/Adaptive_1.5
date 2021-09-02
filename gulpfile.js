const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');


const sassFiles = [
    './src/sass/style.sass', 
    './src/sass/media.sass'
]

function prefix() {
	return gulp.src('./src/build/css/*.css')
    .pipe(autoprefixer({
        "browserslist": [
            "defaults"
          ],
        cascade: false
    }))
        .pipe(gulp.dest('./src/bind/css'))
        .pipe(browserSync.stream());

    }

function serve(){

    browserSync.init({
        server: 'src/'
    });

    gulp.watch('src/sass/*.sass', gulp.series('concat_sass'));
    gulp.watch(['src/*.html', 'src/sass/*.sass']).on('change', () => {
      browserSync.reload(); 
    }); 

}

// Не писать данные в самом constructed.sass/css

function concat_sass(){
    return gulp.src(sassFiles)
    .pipe(concat('constructed.sass'))
    .pipe(gulp.dest('./src/build/sass'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/build/css'))
}


gulp.task('serve', serve);
gulp.task('concat_sass', concat_sass);
gulp.task('prefix', prefix);
