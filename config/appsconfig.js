module.exports = (function(sandbox,config){

	//register need apps
	var admin = config.apps('admin/app.js')(config.core,config.router,sandbox.facade);

	sandbox.registerApp(admin,{
		name: "admin",channel: "admin",
		main: "app.js",watch: "app.js",
	});
		
});