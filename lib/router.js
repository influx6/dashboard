module.exports = (function(utility,url,qs,debug){

	var utility = utility,
		message = {
				default: function(req,path){
					return utilty.makeString(" ","Info:".red,req.method.green,"Page".grey,path.pathname.green)	
				},
				header: function(headers){
					var host = headers.host;
					if(!host.match(/^http:\/\/|^https:\/\//)) host = 'http://'.concat(host);
					return host;
				},
				info: function(req,path,header){
					var host = this.header(header),
						msg = this.default(req,path);
					debug.log(msg,"requested from".grey,host.magenta);
				},
				redirect: function(req,path,header,to){
					var host = this.header(header).concat(to),
						msg = this.default(req,path);
					debug.log(msg,"redirected to".grey,host.magenta);
				},
				custom: function(req,path,header,message){
					var host = this.header(header),
						msg = this.default(req,path);
					debug.log(msg,message,host.magenta);
				}
		},
		helpers = function(scope){
			var find = function(item){
					if(!this[item]) return false;
					return this[item];
				},
			set = function(item,value,force){
					if(this[item] && !force) return this[item];
					this[item] = value;
					return this[item];
			};

			scope.find = function(){ return find.apply(scope, arguments); };
			scope.set = function(){ return set.apply(scope,arguments); };
			return true;
		},
		matchrs = {
			root: /^\/$/,
			basic: /^\/([\w|\d|\-|\_]+)/,
			param: /^:([\w|\d|\-|\_]+)/,
			norm: /^([\w|\d|\-|\_]+)/,
			paramd:/\/(:[\w|\d|\-|\_]+)/,
			pure: /\/([\w|\d|\-|\_]+)/
		},
		methods = {
			"get":"_get_",
			"post":"_post_",
			"put":"_put_",
			"delete":"_delete_",
		},
		Router = function(server){
			var self = this;
			this.pipe = { server: server };
			this.routes = {};
			helpers(this.routes);

			this.routes.set('/404',{ 
				mount:'/404',
				params: null,
				split: null,
				fn: function(res){
				res.writeHead(404,{ 'content-type': "text/plain"});
				res.end("Page Not Found!");}
			});

			server.on('request',function(req,res){
				self.pipe.req = req;
				self.pipe.res = res;
				self.process(req,res);
			});
		};

		Router.fn = Router.prototype;

		Router.fn.route = function(main,sets){
			var processMount = function(mount,callback){
				var temp = mount,
				unit = { fn: callback, params: null, split: null, mount:null },
				split,join=[], m = matchrs,set = {};

				if(temp === '/'){ unit.mount = /^\/$/; return unit; }

				if(temp.charAt(0) === '/') temp = temp.substring(1);
				split = temp.split('/')

				if(!split.length) return false;

				utility.eachSync(split,function(e,i,o,fn){
					if(e.match(m.norm)){
						var tmp = utility.values(m.pure.toString());
						tmp[0] = tmp[tmp.length - 1] = '';
						join.push(tmp.join(''));
					}
					else if(e.match(m.param)){ 
						var item = e.match(m.param),tmp = utility.values(m.paramd.toString());
						tmp[0] = tmp[tmp.length - 1] = '';
						set[item[1]] = null;
						join.push(tmp.join(''));
					}
					if(e.charAt(e.length) === '/') join.push('/');
					fn(false);
				},function(err){
					if(err) return;
					unit.mount = new RegExp(join.join(''));
					unit.params = set;
					unit.split = split;

				},this);

				return unit;

			},
			route = this.routes.set(main,{
				"_get_":{},
				"_post_":{},
				"_put_":{},
				"_delete_":{},
			});
			helpers(route);
			helpers(route._get_);
			helpers(route._post_);
			helpers(route._put_);
			helpers(route._delete_);

			route.get = function(mount,callback){
				var list = this.find("_get_"),processd;
				processd = processMount(mount,callback);
				list.set(processd.mount,processd);
			};
			route.put = function(){};
			route.post = function(){};
			route.delete = function(){};

			//execute sets against the route
			sets.call(route);

		};

		Router.fn.redirect = function(from,to){
			var react = this.routes.find(to);
			if(!react) return false;
			return this.routes.set(from,function(res,req){
				var path = url.parse(req.url);
				message.redirect(req,path,req.headers,to);
				react(res,req);
			});
		}

		Router.fn.process = function(req,res){
			req.res = res;
			res.req = req;

			var path = url.parse(req.url),
				method = methods[req.method.toLowerCase()],
				rootname = path.pathname.match(matchrs.basic)[0],
				root = this.routes.find(rootname);

			if(!root) this.routes.find('/404').fn(res);
			
			utility.eachAsync(root,function(e,i,o,cb){
				
			},function(err){

			},this,function(e,i,o){

			});

			console.log(this.routes,path,root);
		};

	return Router;

});