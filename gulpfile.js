const sourceDir = "./src/main/";
const targetDir = "./dist/";

const gulp = require("gulp");
const plugins = require('gulp-load-plugins')();

let clean = () => {
        return gulp.src(targetDir + '/*', { read: false })
                .pipe(plugins.clean());
}

let js = () => {
        return gulp
                .src(sourceDir + "js/**/*.js")
                .pipe(plugins.regexReplace({ regex: 'import .*? from (?:"|\')([^\'"]+)(?:"|\');', replace: (s) => { return s.endsWith(".js") || !s.startsWith(".") ? s : s + ".js"; } }))
                .pipe(gulp.dest(targetDir + "js"));
}

let translation = () => {
        return gulp
                .src(sourceDir + "locales/**/*")
                .pipe(gulp.dest(targetDir + "locales"));
}

let npm = () => {
        return gulp
                .src(plugins.npmDist(), { base: './node_modules' })
                .pipe(plugins.filter(['**/esm/*']))
                .pipe(plugins.rename(function (path) {
                        path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
                        path.dirname = path.dirname.replace(/\/esm/, '').replace(/\\esm/, '');
                }))
                .pipe(plugins.debug({ title: 'npm:' }))
                .pipe(gulp.dest(targetDir + "libs"));
}

// Compile Our Sass
let sass = () => {
        return gulp.src(sourceDir + "scss/**.scss")
                .pipe(plugins.sass())
                .pipe(gulp.dest(targetDir + "css"));
}

let copyResources = () => {
        return gulp.src(sourceDir + "webapp/**")
                .pipe(gulp.dest(targetDir));
}

exports.clean = clean;
exports.javascript = js;
exports.npm = npm;
exports.sass = sass;
exports.translation = translation;
exports.copyResources = copyResources;
exports.package = gulp.series(clean, gulp.parallel(js, sass, translation, copyResources));
