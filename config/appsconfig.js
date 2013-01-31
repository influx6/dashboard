module.exports = (function(sandbox,config){

	//regsiter sources to fsl for use in reloading the sources when needed
	var admin = config.getPath('app','admin/app.js');
	// sandbox.fsl.add('admin:app.js',config.getPath('app','admin/app.js'));

	//register need apps
	var modules = sandbox.modules();

	sandbox.registerApp(modules.FileWatcher(),{
		name: 'watcher', main: null,
		setup: function(app){}
	},{});

	sandbox.registerApp(modules.HttpServer(function(){
		return sandbox.fsl.require("admin",true)(config.router,config.toolstack);
	}),{
		name: "admin", main: "admin/app.js",
		setup: function(app){
			sandbox.fsl.add('admin',admin);
			sandbox.notify(app.name,'watcher','watch',app.name,admin,function(){
				sandbox.notify('watcher',app.name,'reboot');
			});
		}
	},{});

});