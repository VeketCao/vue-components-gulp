/**
 * Created by Veket on 2017/3/23.
 */
var gulp = require("gulp");
var vuePack = require("./util/vue-pack.js");
var glob = require('glob');
var zip = require("gulp-zip");
var babel = require("gulp-babel");
var es6 = require("babel-preset-es2015");
var runSequence=require("run-sequence");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var buildPath = './dist';
var zipPath = './zip';

/**清除 build 文件夹**/
gulp.task("clean", function () {
    require("del")([buildPath+ "/**" ]);
});

/**命令行输入：gulp zip**/
gulp.task('zip', function () {
    var buildFiles = glob.sync(buildPath+'/*');
    buildFiles.forEach(function (filePath) {
        var name = filePath.substring(filePath.lastIndexOf('/')+1,filePath.length);
        gulp.src(filePath+'/*')
            .pipe(zip(name+'.zip'))
            .pipe(gulp.dest(zipPath));
    });
});

/**编译vue文件**/
gulp.task("vue", function(){
    gulp.src("src/**/*.vue")
        .pipe(vuePack())
        .pipe(gulp.dest(buildPath+"/"));
});

gulp.task("js",function () {
    return gulp.src(buildPath+"/**/*.js")
        .pipe(babel({presets:[es6]}))
        .pipe(gulp.dest(buildPath));
});

gulp.task('min',['minjs','mincss']);

gulp.task('minjs',function () {
    return gulp.src(buildPath+"/**/*.js")
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath));
});

gulp.task('mincss',function () {
    return gulp.src(buildPath+"/**/*.css")
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath));
});

/**copy文件**/
gulp.task('copy', [
    'copy:json',
    'copy:img',
    'copy:eot',
    'copy:svg',
    'copy:ttf',
    'copy:woff',
    'copy:md'
]);

gulp.task("copy:json", function () {
    return gulp.src('src/**/*.json')
        .pipe(gulp.dest(buildPath+"/"));
});

gulp.task('copy:img', function () {
    return gulp.src('src/**/*.png')
        .pipe(gulp.dest(buildPath+"/"));
});

gulp.task('copy:eot', function () {
    return gulp.src('src/**/*.eot')
        .pipe(gulp.dest(buildPath+"/"));
});
gulp.task('copy:svg', function () {
    return gulp.src('src/**/*.svg')
        .pipe(gulp.dest(buildPath+"/"));
});
gulp.task('copy:ttf', function () {
    return gulp.src('src/**/*.ttf')
        .pipe(gulp.dest(buildPath+"/"));
});
gulp.task('copy:woff', function () {
    return gulp.src('src/**/*.woff')
        .pipe(gulp.dest(buildPath+"/"));
});
gulp.task('copy:md', function () {
    return gulp.src('src/**/*.md')
        .pipe(gulp.dest(buildPath+"/"));
});
/**监听根目录下所有.vue文件变化**/
gulp.task('watch',function(){
    gulp.watch( 'src/**/*.vue', ['vue'])
});

gulp.task("default",function (cb) {
    runSequence(['vue','copy'],'js','min','watch',cb);
} );

/**部署发布**/
gulp.task("publish:dist", function () {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest("../../../MIP4.0/UAT/imip_vue_components/dist/"));
});

gulp.task("publish:sample", function () {
    return gulp.src('sample/**/*')
        .pipe(gulp.dest("../../../MIP4.0/UAT/imip_vue_components/sample/"));
});

gulp.task("p", ['publish:dist','publish:sample']);
