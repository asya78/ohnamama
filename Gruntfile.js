/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    basePath: 'public',
                    sassDir: 'sass',
                    cssDir: 'css',
                    imagesDir: 'img',
                    fontsDir: 'fonts'
                }
            },
            dev: {
                options: {
                    basePath: 'public',
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },

        sass: {
            options: {
                compass: true,
                implementation: sass,
                sourceMap: true
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },
        
        cssmin: {
            my_target: {
                files: [{
                        expand: true,
                        cwd: 'css/',
                        src: ['*.css', '!*.min.css'],
                        dest: 'css/',
                        ext: '.min.css'

                    }]
            }
        },

        watch: {
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass:dev']
            }
        }
    });

    grunt.registerTask('default', ['compass:dev', 'sass', 'cssmin', 'watch']);

};
