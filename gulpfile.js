var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var useref = require("gulp-useref");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var csso = require("gulp-csso");

gulp.task("hello", function () {
    console.log("hello gulp!");
})

gulp.task("default", function () {
    var jsFilter = filter("**/*.js", { restore: true });
    var cssFilter = filter("**/*.css", { restore: true });
    var htmlFilter = filter(["**/*", "!**/index.html"], { restore: true });

    return gulp.src("src/index.html")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(useref())
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(htmlFilter)
        .pipe(rev())
        .pipe(htmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest("dist"))
})


