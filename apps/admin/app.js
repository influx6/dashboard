module.exports = (function(core,router){

	var director = function(server){
		var routr = new router(server);

		routr.route('/admins',function(){
			this.get('/', function(){});
			this.get('/:id',function(){});
			this.get('/:id/:state/country/:code',function(){});
		});


	};

	return core.Modules.ServerModule.make(":default").router(director);
});

