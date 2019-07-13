var gulp = require("gulp");
var gulpClean = require("gulp-clean");
var gulpSass = require("gulp-sass");
var gulpTs = require("gulp-typescript");
var gulpTsProject = gulpTs.createProject('tsconfig.json')

var sourceDir = "src/";
var targetDir = "dist/";

let clean = () => {
    return gulp.src(targetDir + '/*', { read: false })
        .pipe(gulpClean());
}

let typescript = () => {
    var tsResult = gulp.src(sourceDir + "ts/**/*.ts")
        .pipe(gulpTsProject());
    return tsResult.js.pipe(gulp.dest(targetDir + "js"));
}

// Compile Our Sass
let sass = () => {
    return gulp.src(sourceDir + "scss/**.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest(targetDir + "css"));
}

let copyResources = () => {
    return gulp.src(sourceDir + "resources/*")
        .pipe(gulp.dest(targetDir));
}

exports.clean = clean;
exports.typescript = typescript;
exports.sass = sass;
exports.copyResources = copyResources;
exports.default = gulp.series(clean, typescript, sass, copyResources);
