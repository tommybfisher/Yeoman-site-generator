// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dev: 'dev',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['<%%= yeoman.app %>/assets/scss/*.scss'],
                /* TO DO: this should be conditional depending on the framework chosen */
                tasks: ['compass:dev']
            },
            html: {
                //files: ['<%%= yeoman.app %>/{,*/}*.html'],
                //files: ['<%%= yeoman.app %>/*.html', '<%%= yeoman.app %>/*/*.html'],
                files: ['<%%= yeoman.app %>/**/*.html'],
                tasks: ['copy:html', 'replace', 'processhtml:dev']
            },
            sprites: {
                files: ['<%%= yeoman.app %>/assets/img/sprite-assets/*.png'],
                tasks: ['spriteHD', 'copy:dev']
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0',
                base: '<%%= yeoman.dev %>'
            },
            livereload: {
                options: {
                    open: 'http://localhost:<%%= connect.options.port %>',
                    base: [
                        '<%%= yeoman.dev %>'
                    ]
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            }
        },

        copy: {
            dev: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/scss/**', '!.htaccess'], dest: '<%%= yeoman.dev %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dev %>/assets/css/fonts'}
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/img/**', '!**/scss/**', '!**/js/*.js', '!**/bower_components/**'], dest: '<%%= yeoman.dist %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['.htaccess'], dest: '<%%= yeoman.dist %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dist %>/assets/css/fonts'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-legacy', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib', rename: function (dest) {
                        return dest + '/jquery-legacy.min.js';
                    }},
                    // Only copy over the minified migrate plugin
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-migrate', src: ['jquery-migrate.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib'}
                ]
            },

            html: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['{,*/}*.html'], dest: '<%%= yeoman.dev %>'}
                ]
            }
        },

        <% if (cssFramework === 'compassSusy') { %>
        compass: {
            dev: {
                options: {
                    sassDir: '<%%= yeoman.app %>/assets/scss',
                    cssDir: '<%%= yeoman.dev %>/assets/css',
                    environment: 'development'
                }
            },

            dist: {
                options: {
                    sassDir: '<%%= yeoman.app %>/assets/scss',
                    cssDir: '<%%= yeoman.dist %>/assets/css',
                    environment: 'production'
                }
            }
        },
        <% } %>

        <% if (cssFramework !== 'compassSusy') { %>
        sass: {
            dev: {
                expand: true,
                cwd: '<%%= yeoman.app %>/assets/scss',
                src: ['*.scss'],
                dest: '<%%= yeoman.dev %>/assets/css',
                ext: '.css'
            },

            dist: {
                expand: true,
                cwd: '<%%= yeoman.app %>/assets/scss',
                src: ['*.scss'],
                dest: '<%%= yeoman.dist %>/assets/css',
                ext: '.css'
            }
        },
        <% } %>

        replace: {
            options: {
                patterns: [{
                    match: '/@jquery-cdn/g',
                    replacement: function () {
                        var jQConf = grunt.file.readJSON('app/assets/bower_components/jquery/bower.json');
                        return '//ajax.googleapis.com/ajax/libs/jquery/' + jQConf.version + '/jquery.min.js';
                    },
                    expression: true
                }, {
                    match: '/@jquery-legacy-cdn/g',
                    replacement: function () {
                        var jQLegConf = grunt.file.readJSON('app/assets/bower_components/jquery-legacy/bower.json');
                        return '//ajax.googleapis.com/ajax/libs/jquery/' + jQLegConf.version + '/jquery.min.js';
                    },
                    expression: true
                }, {
                    match: '/@grunticon/g',
                    replacement: function () {
                        var grunticonInsert = grunt.file.read('app/assets/scss/icons/grunticon.loader.txt');
                        if (grunticonInsert.charAt(0) === '<') {
                            return grunticonInsert;
                        } else return '';
                    },
                    expression: true
                }]
            },

            dev: {
                files: [
                    {src:  ['dev/index.html'], dest: 'dev/index.html'}
                ]
            },

            dist: {
                files: [
                    {src:  ['dist/index.html'], dest: 'dist/index.html'}
                ]
            }
        },

        processhtml: {
            options: {
                process: true,
                templateSettings: {
                    opener: '{!',
                    closer: '!}'
                }
            },
            dev: {
                options: {
                    data: {
                        jqMinLocal: 'assets/bower_components/jquery/jquery.min.js',
                        jqLegMinLocal: 'assets/bower_components/jquery-legacy/jquery.min.js',
                        jqMigrate: 'assets/bower_components/jquery-migrate/jquery-migrate.js'
                    }
                },
                files: {
                    '<%%= yeoman.dev %>/index.html': ['<%%= yeoman.dev %>/index.html']
                }
            },
            dist: {
                options: {
                    data: {
                        jqMinLocal: 'assets/js/lib/jquery.min.js',
                        jqLegMinLocal: 'assets/js/lib/jquery-legacy.min.js',
                        jqMigrate: 'assets/js/lib/jquery-migrate.min.js'
                    }
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.app %>/index.html']
                }
            }
        },

        // htmlmin: {
        //     dist: {
        //         options: {
        //             collapseWhitespace: true
        //         },
        //         files: {
        //             '<%%= yeoman.dist %>/**/*.html': '<%%= yeoman.dist %>/**/*.html'
        //         }
        //     }
        // },

        modernizr: {
            'devFile' : '<%%= yeoman.app %>/assets/bower_components/modernizr/modernizr.js',
            'outputFile' : '<%%= yeoman.dist %>/assets/js/lib/modernizr-custom.min.js',
            'files' : ['<%%= yeoman.dist %>/**/*.js', '<%%= yeoman.dist %>/**/*.css', '<%%= yeoman.dist %>/**/*.scss']
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/assets/js/{,*/}*.js',
                        '<%%= yeoman.dist %>/assets/css/{,*/}*.css',
                        '<%%= yeoman.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%%= yeoman.dist %>/assets/css/fonts/*'
                    ]
                }
            }
        },

        grunticon: {
            dev: {
                options: {
                    src: '<%%= yeoman.app %>/assets/img/icons',
                    dest: '<%%= yeoman.app %>/assets/scss/icons'
                }
            }
        },

        spriteHD: {
            options: {
                destImg: '<%%= yeoman.app %>/assets/img',
                destCSS: '<%%= yeoman.app %>/assets/scss/global',
                imgUrl: '../img'
            },

            all: {
                src: '<%%= yeoman.app %>/assets/img/sprite-assets/*',
                spriteName: 'sheet'
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/img/',
                    src: ['**/*.{png,jpg,jpeg,gif}', '!sprite-assets/*.png'],
                    dest: '<%%= yeoman.dist %>/assets/img/'
                }]
            }
        },

        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html',
            css: '<%%= yeoman.app %>/assets/scss/**/*.scss'
        },

        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/*.html'],
            css: '<%%= yeoman.dist %>/assets/css/*.css'
        }
    });

    grunt.registerTask('server', [
        'dev',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'clean',
        'grunticon',
        'spriteHD',
        'copy:dev',<% if (cssFramework === 'compassSusy') { %>
        'compass:dev',<% } %><% if (cssFramework !== 'compassSusy') { %>
        'sass:dev',<% } %>
        'replace:dev',
        'processhtml:dev'
    ]);

    grunt.registerTask('build', [
        'clean',
        'spriteHD',
        'copy:dist',<% if (cssFramework === 'compassSusy') { %>
        'compass:dist',<% } %><% if (cssFramework !== 'compassSusy') { %>
        'sass:dist',<% } %>
        'modernizr',
        'processhtml:dist',
        'imagemin:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'rev',
        'usemin',
        'replace:dist'
    ]);
};