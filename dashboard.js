var config = require('./config/config'),
	core = config.core,
	debug = config.debug,
	appconfig = config.config('appsconfig.js');

var dashboard = core.Sandbox(config.getPath('root','modules'),config.getPath('root','apps'));

//expose specific instance abilties through the facade
dashboard.facade.fsl = config.fsl.create();

//loadup the app.config and set it on dashboard to load apps
appconfig(dashboard.facade,config);

console.log(dashboard.apps['app:watcher']);
dashboard.apps['app:watcher'].app.bootup();