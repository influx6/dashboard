Admins:
	
	States:
		Collection State ->
			list of items
			delete item
			select item
			return to lists
			list of queries on collection
			add a new item
			reload lists
			
		Item State ->
			delete item
			update item
			return to lists
			edit item
			
		Querie State ->
			add a query
			select a query on collection
			select query on item
			remove query
			reload queries
			
		Error State -> n/a
		
		Template State ->
			add a template
			edit a item template
			add a item template
			return to lists(collection)
			reload template
			
	BasicDesign:
		Base Format: JSON
		State Transfer: Predefined( add queries into the document)
		domain style: general
		application flow: 
			