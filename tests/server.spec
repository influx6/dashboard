var config = require("../config/config"),
core = config.core;
app = config.apps('admin/app.js')(config.core,config.router);
app.start(8000);
// var file = core.Modules.FileWatcherModule.make();
// file.watch(config.);
// setTimeout(function(){ app.stop();}, 5000);

app.on('disconnecting',function(){
	console.log("app is closing!");
});

app.on('disconnected',function(){
	console.log("app is disconnected!");
});

