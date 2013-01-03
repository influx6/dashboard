module.exports = (function(argument) {

	var Template = function(name,version,href){
		var server =  function(){
			this.collection = Template.Collections(name,version,href);
		};

		server.Item = function(name,href,data){
			var item = Template.Item(name,href,data,[]);
			item.addLink = function(set){
				item.link.push(set);
			};
			item.addData = function(key,value,overide){
				if(this.data[key] && !overide) return false
				this.data[key] = value;
			};
			item.push = function(){
				delete item.addData;
				delete item.addData;
				server.collection.items.push(this);
				delete item.push;
			}
			return item;
		}

		server.Link = function(){
			this.collection.links.push(Template.Links.apply(null,arguments);)
		};

		server.template = function(view,name,data,description){
			this.collection.template[view] = Template.Template(name,data,description);
		}
	}

	Template.Collections = function(name,version,href){
		rturn {
			name: name,
			version: version,
			href: href,
			links:[],
			items:[],
			template:{},
			queries:{},
			error:{}
		}
	};

	Template.Links = function(action,name,rel,href,media){
		return {
			action: action, name:name, rel:rel, href:href,media:media
		};
	};

	Template.Item = function(name,href,data,links){
		return { links:links,data:data,href:href };
	};

	Template.Template = function(name,data,description){
		return { name:name, data:data , description: description};
	};

	Template.Queries = function(name,data,href){
		return { name:name,href = href,data:data };
	};

	return Template;
});
