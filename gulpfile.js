    var gulp 	     = require('gulp'),
    gutil        = require('gulp-util'),
    fs 	         = require('fs'),
    changed      = require('gulp-changed'),
    compass      = require('gulp-compass'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    header       = require('gulp-header'),
    jekyll 	     = require('gulp-jekyll'),
    uglify 	     = require('gulp-uglify'),
    svgmin       = require('gulp-svgmin'),
    imagemin 	 = require('gulp-imagemin'),
    debug        = require('gulp-debug'),
    serve        = require('gulp-serve'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload'),
    tlr          = require('tiny-lr'),  // tiny live reload
    slr          = tlr();               // server live reload

var paths = {};

/*
    ----- COMPASS -----
*/
paths.compass = 'src/sass/**/*.scss';
gulp.task('compass',function()
{
    return gulp.src(paths.compass)
        .pipe(compass({
            project:'.',
            config_file:'src/sass/config.rb',
            // css:'build/css',
            sass:'src/sass',
            css:'.tmpcss',
            import_path:'bower_components',
            // style:'expanded', // expanded or nested or compact or compressed // in config.rb
        }));
});

/*
    ----- AUTO PREFIX -----
*/
paths.styles = '.tmpcss/*.css'
gulp.task('styles',function()
{
    // return gulp.src('build/css/*.css')
    return gulp.src(paths.styles)
        // .pipe(sass({
        //     includePaths: ['bower_components'],
        //     outputStyle: 'compressed'
        // }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))        
        .pipe(gulp.dest('build/css'))
        .pipe(livereload(slr));
});

/*
    ----- JEKYLL -----
*/
paths.jekyll = ['build/**/*.{html,yml,md,mkd,markdown,php}','build/_config.yml'];
// gulp.task('jekyll',function()
// {
//     /* jekyll */
//     return gulp.src(paths.jekyll)
//         .pipe(jekyll({
//             source: 'build',
//             destination: '.jekyll',
//             // bundleExec:true,
//         }))
//         .pipe(gulp.dest('.jekyll'))
//         .pipe(livereload(slr));
// });

gulp.task('jekyll',function()
{
    var spawn   = require('child_process').spawn,
        j       = spawn('jekyll', [
                    '-s', 'build',
                    '-d', '.jekyll',
                    '--config', 'build/_config.yml,build/_localconfig.yml'
                    ]);
    j.stdout.on('data', function (data) {
        // console.log('' + data); // works fine
    });
});

/*
    ----- BASIC LIVERELOAD -----
*/
paths.livereload = ['lrl/index.php','lrl/pages/*.php'];
gulp.task('livereload',function()
{
    /* jekyll */
    return gulp.src('lrl/index.php')
        // .pipe(changed('lrl'))
        .pipe(livereload(slr));
});

/*
    ----- JS LIBRARIES -----
*/
gulp.task('libScripts',function()
{
    var file = fs.readFileSync('src/js/allJS.conf','utf8').trim().split('\n');    
    var src = file.filter(function(v)
    {
        if (!v) return false;
        if (v.substr(0,1) == '#') return false;   

        if (!fs.existsSync(v)) 
        {
            gutil.log(gutil.colors.red(v+' does not exist!'));
            return false;
        }
              
        return true;
    })
    gutil.log(src);

    /* javascript minify */    
    return gulp.src(src,{base:'bower_components/'})
        .pipe(uglify())  
        .pipe(header("/*! bower_components/${file.relative} */\n",{foo:'bar'}))
        .pipe(concat("all.min.js"))
        .pipe(gulp.dest('build/js'))
        // .pipe(livereload(slr))
        ;
});

/*
    ----- JS FILES -----
*/
gulp.task('scripts',function()
{
    return gulp.src('src/js/**/*.js')
        .pipe(changed('build/js'))
        .pipe(uglify())  
        .pipe(gulp.dest('build/js'))        
        .pipe(livereload(slr));
});

/*
    ----- SVG MINIFY -----
*/
gulp.task('svg',function()
{
    return gulp.src('src/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/img'));
});

/*
    ----- BITMAPS MINIFY -----
*/
gulp.task('bitmaps',function()
{
    return gulp.src('src/img/*.{jpg,jpeg,gif,png}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

/*
    ----- SERVER -----
*/
gulp.task('serve',serve(['.jekyll','build']));

/*
    ----- WATCH -----
*/
gulp.task('watch', function() {
 
    // Listen on port 35729
    slr.listen(35729, function (err) 
    {
        if (err) { return console.log(err); } 

        // Watch .scss files
        gulp.watch(paths.compass, function(event) {
            message(event, 'sass');
            gulp.run('compass');
        });

        // Watch .css files
        gulp.watch(paths.styles, function(event) {
            message(event, 'styles');
            gulp.run('styles');
        });
     
        // Watch .js files
        gulp.watch('src/js/**/*.js', function(event) {
            message(event,'scripts');
            gulp.run('scripts');
        });

        // Watch JS library conf
        gulp.watch(['src/js/allJS.conf','src/js/actuate/**/*.js'], function(event) {
            message(event,'');
            gulp.run('libScripts');
        });

        // Watch bitmaps
        gulp.watch('src/img/*.{jpg,jpeg,gif,png}', function(event) {
            message(event,'');
            gulp.run('bitmaps'); 
        })

        // Watch Jekyll files
        gulp.watch(paths.jekyll,function(event)
        {
            message(event,'');
            gulp.run('jekyll'); 
        })

        gulp.watch(paths.livereload,function(event)
        {
            message(event,'');
            gulp.run('livereload'); 
        })

        function message(event,name)
        {
            var d = new Date();
            gutil.log(d.getHours()+':'+d.getMinutes()+' - ' + gutil.colors.yellow(event.path) + ' was ' + event.type + ', running tasks...');
        }        

    });
});

/*
    ----- DEFAULT -----
*/
gulp.task('default', function(){
    gulp.run('watch');
    gulp.run('serve');
});