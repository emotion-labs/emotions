let gulp = require("gulp");
let sourceDir = "src/";
let targetDir = "dist/";

let clean = () => {
        let gulpClean = require("gulp-clean");
        return gulp.src(targetDir + '/*', { read: false })
                .pipe(gulpClean());
}

let typescript = () => {
        let gulpTs = require("gulp-typescript");
        let gulpTsProject = gulpTs.createProject('tsconfig.json')
        let gulpReplace = require('gulp-regex-replace');
        return gulp
                .src(sourceDir + "ts/**/*.ts")
                .pipe(gulpTsProject()).js
                .pipe(gulpReplace({ regex: 'import .*? from (?:"|\')([^\'"]+)(?:"|\');', replace: (s) => { return s.endsWith(".js") || !s.startsWith(".") ? s : s + ".js"; } }))
                .pipe(gulp.dest(targetDir + "js"));
}

let npm = () => {
        var npmDist = require('gulp-npm-dist');
        var rename = require('gulp-rename');
        return gulp
                .src(npmDist(), { base: './node_modules' })
                .pipe(rename(function (path) {
                        path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
                        console.log(path);
                }))
                .pipe(gulp.dest(targetDir + "libs"));
}

// Compile Our Sass
let sass = () => {
        let gulpSass = require("gulp-sass");
        return gulp.src(sourceDir + "scss/**.scss")
                .pipe(gulpSass())
                .pipe(gulp.dest(targetDir + "css"));
}

let copyResources = () => {
        return gulp.src(sourceDir + "resources/**")
                .pipe(gulp.dest(targetDir));
}

exports.clean = clean;
exports.typescript = typescript;
exports.npm = npm;
exports.sass = sass;
exports.copyResources = copyResources;
exports.package = gulp.series(clean, gulp.parallel(typescript, sass, copyResources));
