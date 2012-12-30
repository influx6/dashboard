var config = require("../config/config"),
core = config.core;
app = config.app('admin/app.js')(config.core,config.router);
app.connect(8000);
// var file = core.Modules.FileWatcherModule.make();
// file.watch(config.)

