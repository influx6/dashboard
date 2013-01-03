var js = require('jsconcat'), uglify = false, builds = "./builds";

js.compile({
	build_dir: builds,
	src_dir:"./exts/toolstack",
	name:"toolstack.js",
	uglify: uglify,
	src:['./toolstack.js','./lib/stack.utility.js','./lib/stack.env.js','./lib/stack.ascolors.js',
	'./lib/stack.class.js','./lib/stack.flux.js','./lib/stack.console.js',
	'./lib/stack.callbacks.js','./lib/stack.events.js','./lib/stack.promise.js',
	'./lib/stack.matchers.js','./lib/stack.jaz.js','./lib/stack.structures.js',
	'./lib/stack.stalk.js']
});

js.compile({
	build_dir: builds,
	src_dir:"./exts/core",
	name:"core.js",
	uglify: uglify,
	src:['./src/core.js']
});

js.compile({
	build_dir: builds,
	src_dir:"./exts/core/modules/server",
	name:"core-servermodules.js",
	uglify: uglify,
	src:['./module.server.js','./module.filewatcher.js']
});

// js.compile({
// 	build_dir: builds,
// 	src_dir:"./exts/core/modules/client",
// 	name:"core-clientmodules.js",
// 	uglify: uglify,
// 	src:[]
// });