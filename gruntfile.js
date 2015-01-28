'use strict';

require('blanket')({
    'data-cover-only': 'http-jquery.js',
    'data-cover-never': 'node_modules/'
});

var tasks = require('load-grunt-tasks');
var time  = require('time-grunt');

module.exports = function (grunt) {
    time(grunt);
    tasks(grunt);

    grunt.initConfig({
        bumpup: {
            file: 'package.json'
        },

        coveralls: {
            src: 'test/lcov.info'
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },

            src: [
                '**/*.js',
                '!node_modules/**/*.js'
            ]
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            src: [
                '**/*.js',
                '**/*.json',
                '!node_modules/**/*.js',
                '!node_modules/**/*.json'
            ]
        },

        mochaTest: {
            options: {
                colors: true,
                ui: 'bdd'
            },

            spec: {
                options: {
                    reporter: 'spec'
                },

                src: 'test/*.test.js'
            },

            'html-cov': {
                options: {
                    captureFile: 'test/coverage.html',
                    quiet: true,
                    reporter: 'html-cov'
                },

                src: 'test/*.test.js'
            },

            'console-cov': {
                options: {
                    reporter: 'mocha-cov-reporter'
                },

                src: 'test/*.test.js'
            },

            'lcov-cov': {
                options: {
                    captureFile: 'test/lcov.info',
                    quiet: true,
                    reporter: 'mocha-lcov-reporter'
                },

                src: 'test/*.test.js'
            }
        },

        module: {
            'check-repository': {
                options: {
                    check: true
                }
            },

            'license-copyright': {
                options: {
                    replace: true,
                    line: 3
                },

                src: 'LICENSE'
            },

            'release-publish': {
                options: {
                    release: true,
                    publish: true
                }
            }
        }
    });

    grunt.registerTask('test', [
        'mochaTest:spec',
        'mochaTest:html-cov',
        'mochaTest:console-cov',
        'mochaTest:lcov-cov'
    ]);

    grunt.registerTask('build', [
        'jscs',
        'jshint',
        'test'
    ]);

    grunt.registerTask('publish', function (type) {
        grunt.task.run('build');
        grunt.task.run('module:check-repository');
        grunt.task.run('bumpup:' + type);
        grunt.task.run('module:license-copyright');
        grunt.task.run('module:release-publish');
    });

    grunt.registerTask('travis', [
        'build',
        'coveralls'
    ]);

    grunt.registerTask('default', 'build');
};
