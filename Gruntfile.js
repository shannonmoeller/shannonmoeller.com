/*jshint node:true */
'use strict';

module.exports = function (grunt) {
    // Configuration
    grunt.initConfig({
        /**
         * Meta
         */

        pkg: require('./package.json'),

        dirs: {
            dest: 'www',
            src: 'src'
        },

        /**
         * CSS
         */

        csslint: {
            all: [
                '<%= dirs.src %>/**/*.css',
                '!**/node_modules/**',
                '!**/vendor/**'
            ]
        },

        autoprefixer: {
        },

        cssmin: {
        },

        /**
         * HTML
         */

        hbt: {
            all: {
                options: {
                    data: require('./meta'),
                    helpers: [
                        '<%= dirs.src %>/**/helper/**/*.js',
                        '<%= dirs.src %>/**/vendor/handlebars*/**/*.js'
                    ],
                    partials: [
                        '<%= dirs.src %>/**/partial/**/*.hbt'
                    ]
                },

                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>',
                    src: [
                        '**/*.hbt',
                        '!**/partial/**'
                    ],
                    dest: '<%= dirs.dest %>',
                    ext: '.html'
                }]
            }
        },

        prettify: {
        },

        /**
         * JS
         */

        jshint: {
            all: [
                'Gruntfile.js',
                '<%= dirs.src %>/**/*.js',
                '!**/node_modules/**/*.js',
                '!**/vendor/**/*.js'
            ]
        },

        browserify: {
        },

        simplemocha: {
        },

        /**
         * Development
         */

        clean: {
            css: '<%= dirs.dest %>/assets/css',
            html: '<%= dirs.dest %>/**/*.html',
            js: '<%= dirs.dest %>/assets/js',
            dest: '<%=dirs.dest %>',
            node: 'node_modules'
        },

        watch: {
            options: {
                livereload: true,
            },

            css: {
                files: '<%= csslint.all %>',
                tasks: ['css']
            },

            html: {
                files: '<%= hbt.all.files %>',
                tasks: ['html']
            },

            js: {
                files: '<%= jshint.all %>',
                tasks: ['js']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-hbt');
    grunt.loadNpmTasks('grunt-prettify');

    // Tasks
    grunt.registerTask('css', ['clean:css', 'csslint']);
    grunt.registerTask('html', ['clean:html', 'hbt']);
    grunt.registerTask('js', ['clean:js', 'jshint']);
    grunt.registerTask('test', ['css', 'html', 'js']);
    grunt.registerTask('default', ['test']);
};
