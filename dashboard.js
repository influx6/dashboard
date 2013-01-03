var config = require('./config/config'),
	core = config.core,
	debug = config.debug,
	appconfig = config.config('appsconfig.js');

var dashboard = core.Sandbox(config.getPath('root','modules'),config.getPath('root','apps'));

//loadup the app.config and set it on dashboard to load apps
appconfig(dashboard,config);

debug.log(dashboard);
