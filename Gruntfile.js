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

        cssmin: {
            all: []
        },

        autoprefixer: {
            all: []
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
                        '!**/partial/**',
                        '!**/vendor/**'
                    ],
                    dest: '<%= dirs.dest %>',
                    ext: '.html'
                }]
            }
        },

        prettify: {
            all: {
                options: {
                    brace_style: 'end-expand',
                    indent_size: 4
                },

                files: [{expand: true,
                    cwd: '<%= dirs.dest %>',
                    ext: '.html',
                    src: [
                        '**/*.html',
                        '!**/vendor/**'
                    ],
                    dest: '<%= dirs.dest %>'
                }]
            }
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
            all: [],
            test: []
        },

        simplemocha: {
            test: []
        },

        /**
         * Development
         */

        clean: {
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
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-hbt');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // Tasks
    grunt.registerTask('css', ['csslint', 'cssmin', 'autoprefixer']);
    grunt.registerTask('html', ['hbt', 'prettify']);
    grunt.registerTask('js', ['jshint', 'browserify', 'simplemocha']);
    grunt.registerTask('test', ['clean:dest', 'css', 'html', 'js']);
    grunt.registerTask('default', ['html']);
};
