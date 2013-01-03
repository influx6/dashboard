module.exports = (function(){

	var config = __dirname,
		path = require('path'),
		url = require('url'),
		qs = require('querystring'),
		domain = require('domain'),
		debug = null,

		coredir = path.resolve(config,'../../core'),
		toolstackdir = path.resolve(config,'../../toolstack'),
		rootdir = path.resolve(config,".."),
		libdir = path.resolve(config,"../lib"),
		appdir = path.resolve(config,"../apps"),
		moduledir = path.resolve(coredir,"modules"),

		toolstack = require(path.resolve(toolstackdir,'./builds/toolstack.js')).ToolStack,
		router = require(path.resolve(libdir,'./router.js')),
		core = require(path.resolve(coredir,'./src/core.js')).Core(toolstack);

		debug = toolstack.Console.init('console');
		router = router(toolstack.Utility,url,qs,debug,domain);


		var configuration = {
			http: require('http'),
			fs: require('fs'),
			url: url,
			qs: qs,
			router: router,
			debug: debug,
			path:path,
			toolstack: toolstack,
			core: core,
			dirs:{
				root: rootdir, lib:libdir, app: appdir, modules:moduledir,
				toolstack: toolstackdir, core: coredir, config: config
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
	configuration.modules('server/module.server.js')(core,toolstack.Utility,debug,domain);
	configuration.modules('server/module.filewatcher.js')(core,toolstack.Utility,debug,domain);

		// configuration.Modules = core.Modules;

		return configuration;
})();