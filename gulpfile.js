/**
 * Created by fabienbrun on 18/01/16.
 */
var gulp      = require('gulp'),
    rename    = require('gulp-rename'),     // Renommage des fichiers
    sass      = require('gulp-sass'),       // Conversion des SCSS en CSS
    minifyCss = require('gulp-minify-css'), // Minification des CSS
    uglify    = require('gulp-uglify');     // Minification/Obfuscation des JS


// SCSS TASK
gulp.task('css', function()
{
    return gulp.src('style/sass/*.scss')    // Prend en entrée les fichiers *.scss
        .pipe(sass())                      // Compile les fichiers
        .pipe(minifyCss())                 // Minifie le CSS qui a été généré
        .pipe(gulp.dest('style/'));  // Sauvegarde le tout dans /src/style
});


// WATCH TASK
gulp.task('watch', function()
{
    gulp.watch('style/sass/*.scss', ['css']);
});

gulp.task('default', ['watch']);