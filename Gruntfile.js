module.exports = function(grunt){
    var config = {
        ngtemplates: {
            app: {
                cwd:'app',
                src: 'template/**.html',
                dest: 'app/dist/template/template.js',
                options: {
                    angular: 'angular',
                    module: 'myApp',
                    usemin: 'app'
                }
            }
        },
        uglify: {
            generated: {
                files: [{
                    expand: true,
                    cwd:'app',
                    src: ['dist/template/*.js'],
                    dest: "app",
                    ext: '.js'
                }]
            },
            lib:{
                files:[{
                    expand:true,
                    cwd:'app',
                    src:[ 'components/angular/angular.min.js', 'components/jquery/jquery.min.js', 'components/dialog/dialog.js','components/lottery/lottery.js','components/carousel-image/carousel-image.js'],
                    dest:'app/dist'
                }]
            }
        },
        concat:{
            generated:{
                src:  ['app/dist/template/template.js' ],
                dest: 'app/dist/template/template.js'
            },
            lib:{
                src:[ 'app/dist/components/angular/angular.min.js', 'app/dist/components/jquery/jquery.min.js', 'app/dist/components/dialog/dialog.js','app/dist/components/lottery/lottery.js','app/dist/components/carousel-image/carousel-image.js'],
                dest:'app/dist/lib.js'
            },
            app:{
                src:['app/app.js',"app/directives/directives.js",'app/services/services.js','app/dist/template/template.js'],
                dest:'app/dist/app.js'
            }
        }
    };
    config.watch={
        scripts:{
            files:['app/app.js','app/directives/*.js'],
            tasks:['default'],
            options:{
                livereload: true
            }
        },
        html:{
            files:['app/**/*.html'],
            tasks:['default'],
            options:{
                livereload: true
            }
        },
        css:{
            files:['app/**/*.css'],
            options:{
                livereload: true
            }
        }
    };
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('default',['ngtemplates','uglify','concat','concat:app'])
}