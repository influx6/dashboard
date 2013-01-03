module.exports = (function(core,router,facade){

	var director = function(server){
		var routr = new router(server);
		this.domain().add(routr);

		routr.route('/admins',function(){

			this.get('/', function(req,res){
				res.writeHead(200,{'content-type':"text/plain"});
				res.end("welcome to Admin central!");
			});

			this.get('/:id',function(req,res){
				res.writeHead(200,{'content-type':"text/plain"});
				res.end("welcome Admin with ID:"+res.params.url.id+" !");
			});

			this.post('/:id',function(req,res,body){
				res.writeHead(200,{'content-type':'text/plain'});
				var em = "recieved: "+JSON.stringify(body);
				res.end(em);
			});

			this.get('/:id/country/:state/:code',function(req,res){
				res.writeHead(200,{'content-type':"text/plain"});
				res.end("Admin of "+res.params.url.state+" with ID:"+res.params.url.id+" and code:"+ res.params.url.code+"!");
			});

		});

		routr.route('/',function(){
			/*when redirecting from root,only root to root will work,you can redirect root/:id to /admins/:id,its
			/a limitation of the router and was intentionally set that way,if u wish,just create another URL then reout to that eg
				like the routes for /a, which does rerouting from /admins to /a,look below to see the route commented out
			*/
			this.redirect('/','/admins/','get');
		});

		//example of using full on re-routing
		routr.route('/a',function(){
			this.redirect('/','/admins/','get');
			this.redirect('/:id','/admins/:id','get');
			this.redirect('/:id/country/:state/:code','/admins/:id/country/:state/:code','get');
		});

	};

	return core.Modules.ServerModule.make(":default").channel(facade).router(director);
});

