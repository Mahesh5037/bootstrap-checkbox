'use strict';

module.exports = function(grunt) {
	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: ['dist', 'docs/dist']
		},
		copy: {
			js: {
				src: 'js/**/*',
				dest: 'dist/'
			},
			docs: {
				src: 'dist/**/*',
				dest: 'docs/'
			}
		},
		cssmin: {
			docs: {
				src: [
					'docs/assets/css/src/pygments-manni.css',
					'docs/assets/css/src/docs.css'
				],
				dest: 'docs/assets/css/docs.min.css'
			}
		},
		jshint: {
			options: {
				strict: true,
				globalstrict: true
			},
			core: {
				options: {
					jquery: true,
					globals: {
						console: true
					}
				},
				src: 'js/**/*'
			},
			grunt: {
				options: {
					node: true
				},
				src: 'Gruntfile.js'
			}
		},
		uglify: {
			core: {
				expand: true,
				src: 'dist/js/**/*.js',
				ext: '.min.js'
			},
			docs: {
				src: 'docs/assets/js/src/docs.js',
				dest: 'docs/assets/js/docs.min.js'
			}
		},
		usebanner: {
			options: {
				banner: '/*!\n' +
					' * Bootstrap-checkbox v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
					' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
					' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
					' */\n'
			},
			dist: 'dist/**/*'
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});

	grunt.registerTask('default', ['clean', 'copy:js', 'cssmin', 'jshint', 'uglify', 'usebanner', 'copy:docs']);
};
