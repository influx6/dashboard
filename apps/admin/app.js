module.exports = (function(router,ts){

	router.InitWare();

	var util = ts.Utility,
	errorHandler = function(err,req,res,next){
		if(err){
			var stack = (err && err.stack) ? err.stack : '';
			res.setStatus(404).pushHead();
			res.write('Not Found Buddy!\n');
			res.end(stack);
			req.destroy();
		}
	},
	ware = router.RouterWare(router.R),
	midware = router.Middleware,
	director = function(server){
		var routr = ware.Router(server);
		
		app.use(errorHandler);
		app.use(midwares.Logger({ immediate: false}));
		// app.use(midwares.BodyParser());
		app.use('/public/*',midwares.FileServer(__dirname,{ redirect: true}));
		app.use(midwares.Query());

	};

	return director;
});

