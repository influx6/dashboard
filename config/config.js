module.exports = (function(){

	var config = __dirname,
		path = require('path'),
		url = require('url'),
		qs = require('querystring'),

		coredir = path.resolve(config,'../../corejs'),
		toolstackdir = path.resolve(config,'../../toolstack'),
		routerdir = path.resolve(config,'../../router.js'),
		rootdir = path.resolve(config,".."),
		libdir = path.resolve(config,"../lib"),
		appdir = path.resolve(config,"../apps"),
		moduledir = path.resolve(coredir,"modules"),

		toolstack = require(path.resolve(toolstackdir,'./builds/toolstack.js')).ToolStack,
		router = require(path.resolve(routerdir,'./builds/router.js')),
		core = require(path.resolve(coredir,'./src/core.js')).Core(toolstack);

		debug = toolstack.Console.init('node');


		var configuration = {
			http: require('http'),
			fs: require('fs'),
			fsl: require('fsl'),
			url: url,
			qs: qs,
			router: router,
			debug: debug,
			path:path,
			toolstack: toolstack,
			core: core,
			dirs:{
				root: rootdir, lib:libdir, app: appdir, modules:moduledir,
				toolstack: toolstackdir, core: coredir, config: config, routerdir: routerdir
			},
			getPath: function(name,file){
				if(!this.dirs[name]) return false;
				return path.resolve(this.dirs[name],file);
			},
			loadPath: function(name,file){
				return require(this.getPath(name,file));
			},
			root: function(file){
				return require(path.resolve(rootdir,file));
			},
			modules: function(file){
				return require(path.resolve(moduledir,file));
			},
			lib:function(file){
				return require(path.resolve(libdir,file));
			}, 
			apps: function(file){
				return require(path.resolve(appdir,file));
			},
			config: function(file){
				return this.loadPath('config',file);
			}
		};

	//loadup extra modules for immediate access;
	configuration.modules('server/module.server.js')(core,toolstack);
	configuration.modules('server/module.filewatcher.js')(core,toolstack);

	return configuration;

})();