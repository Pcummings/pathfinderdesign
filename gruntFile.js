module.exports = function(grunt) {

    // 1. All configuration goes here 
  grunt.initConfig({
	
    pkg: grunt.file.readJSON('package.json'),

    clean: {
		  build: {
		    src: [ 'build' ]
		  },
		},

    copy: {
    	main: {
	      files: [
		      {expand: true, cwd: 'src/assets/styles', src: ['**/*.css'], dest: 'build/styles'},
          // {expand: true, cwd: 'src/assets/js', src: ['**/*.js'], dest: 'build/js'},
          {expand: true, cwd: 'src/views', src: ['**/*.html'], dest: 'build'}      
		    ]
			}
    },

	  concat: {
	    dist: {
	      src: ['src/assets/js/jquery-1.11.0.min.js', 'src/assets/js/*.js'],
	      dest: 'build/js/built.min.js'
	    },
	  },

	   uglify: {
	    my_target: {
	      files: {
	        'build/js/built.min.js': ['build/js/built.min.js']
	      }
	    }
	  },
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/assets/images/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'build/images'
				}]
			}
		},
		
		less: {
		  css: {
				files: {
				  "build/styles/importer.css": "src/assets/styles/importer.less"
				}
		  }
		},

		watch: {
		  js: {
				files: ['src/assets/js/*.js'],
				tasks: ['concat', 'uglify'],
		  },
		  styles: {
				files: ['src/assets/styles/*.less', 'src/assets/styles/*.css'],
				tasks: ['less:css', 'copy'],
		  },

		  views: {
		  	files: ['src/views/*'],
		  	tasks: ['copy'],
		  },

		  images: {
		  	files: ['src/assets/images/*'],
		  	tasks: ['imagemin'],
		  },

		  options: {
      	  	livereload: true,
          	spawn: false
  		  }
		}

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	
  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['clean', 'less:css', 'imagemin', 'concat', 'uglify', 'copy', 'watch']);

};