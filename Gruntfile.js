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
            docs: 'docs',
            src: 'src',
            test: 'test'
        },

        /**
         * HTML
         */

        hbt: {
            options: {
                data: require('./src/data'),
                helpers: [
                    '<%= dirs.src %>/**/helper/**/*.js',
                    '<%= dirs.src %>/**/vendor/handlebars*/**/*.js'
                ],
                partials: ['<%= dirs.src %>/**/partial/**/*.hbt']
            },
            all: {
                expand: true,
                cwd: '<%= dirs.src %>',
                src: [
                    '**/*.hbt',
                    '!**/partial/**',
                    '!**/vendor/**'
                ],
                dest: '<%= dirs.dest %>',
                ext: '.html'
            }
        },

        prettify: {
            options: {
                indent_char: ' ',
                indent_size: 4
            },
            all: {
                expand: true,
                cwd: '<%= dirs.dest %>',
                src: [
                    '**/*.html',
                    '!**/vendor/**'
                ],
                dest: '<%= dirs.dest %>',
                ext: '.html'
            }
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
            options: {
                removeEmpty: true
            },
            all: {
                expand: true,
                cwd: '<%= dirs.src %>',
                src: ['assets/css/*.css'],
                dest: '<%= dirs.dest %>'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            all: {
                expand: true,
                cwd: '<%= dirs.dest %>',
                src: ['assets/css/*.css'],
                dest: '<%= dirs.dest %>'
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
            build: {
                options: {
                    standalone: '<%= pkg.name %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>',
                    src: ['assets/js/controller/*.js'],
                    dest: '<%= dirs.dest %>'
                }]
            },
            test: {
                options: {
                    debug: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.test %>',
                    src: ['**/test.*.js'],
                    dest: '<%= dirs.test %>/all.js'
                }]
            }
        },

        simplemocha: {
            options: {
                reporter: 'spec'
            },
            all: ['test/all.js']
        },

        /**
         * Assets
         */

        copy: {
            all: {
                expand: true,
                cwd: '<%= dirs.src %>',
                src: [
                    'assets/font/**',
                    'assets/img/**'
                ],
                dest: '<%= dirs.dest %>',
                filter: 'isFile'
            }
        },

        /**
         * Development
         */

        clean: {
            dest: [
                '<%= dirs.dest %>/*',
                '!**/.git/**'
            ],
            node: 'node_modules'
        },

        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            html: {
                files: [
                    '<%= dirs.src %>/data.js',
                    '<%= dirs.src %>/**/*.hbt'
                ],
                tasks: ['html']
            },
            css: {
                files: ['<%= dirs.src %>/**/*.css'],
                tasks: ['css']
            },
            js: {
                files: ['<%= dirs.src %>/**/*.js'],
                tasks: ['js']
            },
            assets: {
                files: [
                    'assets/font/**',
                    'assets/img/**'
                ],
                tasks: ['assets']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-hbt');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('html', ['hbt', 'prettify']);
    grunt.registerTask('css', ['csslint', 'cssmin', 'autoprefixer']);
    grunt.registerTask('js', ['jshint', 'browserify', 'simplemocha']);
    grunt.registerTask('assets', ['copy']);

    // Default
    grunt.registerTask('default', ['clean:dest', 'html', 'css', 'js', 'assets']);
};
