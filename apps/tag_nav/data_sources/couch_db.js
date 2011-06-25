// ==========================================================================
// Project:   TagNav.CouchDbDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require('models/media');

TagNav.MEDIAS_QUERY = SC.Query.local(TagNav.Media);
TagNav.PARAMS_QUERY = SC.Query.local(TagNav.Params);

/** @class

  DataSource implementation which connect to CouchDB backend.
  This application is designed to be served right from within CouchDB
  so it keep the same origin policy when sending HTTP request back to its source.

  @extends SC.DataSource
*/
TagNav.CouchDbDataSource = SC.DataSource.extend(
/** @scope TagNav.CouchDbDataSource.prototype */ {

	_dbpath: 'db',

	 getServerPath: function(resourceName) {
	   var path = '/' + this._dbpath + "//" + resourceName;
	   return path;
	 },

	getServerView: function(viewName) {
		var path = '/' + this._dbpath + "/_design/app/_view/" + viewName;
		return path;
	},

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
	if (query === TagNav.MEDIAS_QUERY) {
		SC.Request.getUrl(this.getServerView('allMedia')).json()
		          .header('Accept', 'application/json')
		          .notify(this, 'didFetchMedias', store, query)
		          .send();

		return YES;
	}
	else if (query === TagNav.PARAMS_QUERY) {
		SC.Request.getUrl(this.getServerView('allMedia')).json()
		          .header('Accept', 'application/json')
		          .notify(this, 'didFetchParams', store, query)
		          .send();

		return YES;		
	}

    return NO ; // We do not support the requested query
  },

  didFetchMedias: function(response, store, query) {
      if(SC.ok(response)) {
		var body = response.get('encodedBody');
		var couchResponse = SC.json.decode(body);
		var records = couchResponse.rows.getEach('value');

         store.loadRecords(TagNav.Media, records);
         store.dataSourceDidFetchQuery(query);
      } else {
         store.dataSourceDidErrorQuery(query, response);
      }
    },

  didFetchParams: function(response, store, query) {
      if(SC.ok(response)) {
		var body = response.get('encodedBody');
		var couchResponse = SC.json.decode(body);
		var records = couchResponse.rows.getEach('value');

         store.loadRecords(TagNav.Params, records);
         store.dataSourceDidFetchQuery(query);
      } else {
         store.dataSourceDidErrorQuery(query, response);
      }
    },

  // ..........................................................
  // RECORD SUPPORT
  // 

  retrieveRecord: function(store, storeKey) {
	if (SC.kindOf(store.recordTypeFor(storeKey), TagNav.Params)) {
		var id = encodeURIComponent(store.idFor(storeKey));

		hash = {"_id":"params","_rev":"2-e478b8afaea8516ac8d6d7024c01b8dd","homeLabels":"['\u05d7\u05d3\u05e9', '\u05e2\u05de\u05e7', '\u05d9\u05dc\u05d3\u05d9\u05dd']"};
console.log(['params', hash]);
//		store.dataSourceDidComplete(storeKey, hash);
		return YES;
				
		SC.Request.getUrl(this.getServerPath(id)).json()
		          .header('Accept', 'application/json')
		          .notify(this, 'didRetrieveParams', store, storeKey)
		          .send();

		return YES;
	}

    return NO ; // return YES if you handled the storeKey
  },

  didRetrieveParams: function(response, store, storeKey) {
		console.log(['retrieveParam', dataHash]);
		return;
    if (SC.ok(response)) {
      var dataHash = response.get('body').content;
      store.dataSourceDidComplete(storeKey, dataHash);

    } else store.dataSourceDidError(storeKey, response);
  }, 

  /**
  Process response from CouchDB of create, update, delete operations.

  @returns id,rev for success, null for failure.
  */
  processResponse: function(response) {
	 if (SC.ok(response)) {
		var body = response.get('encodedBody'); 
		var couchResponse = SC.json.decode(body);
		var ok = couchResponse.ok;
		if (ok != YES) return {"error":true, "response":couchResponse};

		var id = couchResponse.id;
		var rev = couchResponse.rev;
		return {"ok":true, "id": id, "rev": rev};
     } else {
    	return {"error":true, "response":response};
	 }
  },

  /**
  Get the latest revision of the document.
  For docs which were fetch from the server we use _rev field,
  and for docs that were modified we use the local _docsRev dictionary.
  */
  getDocRev: function(doc) {
	return doc._rev;
  },

  createRecord: function(store, storeKey) {

	if (SC.kindOf(store.recordTypeFor(storeKey), TagNav.Media)) {
		SC.Request.postUrl(this.getServerPath('/')).json()
		           .header('Accept', 'application/json')
		           .notify(this, this.didCreateMedia, store, storeKey)
		           .send(store.readDataHash(storeKey));

		return YES;
    }

    return NO ; // We do not support the record type
  },

  didCreateMedia: function(response, store, storeKey) {
	 var couchRes = this.processResponse(response);
     if (couchRes.ok) {
		// Add _id and _rev to the local document for further server interaction.
		var localDoc = store.readDataHash(storeKey);
		localDoc._id = couchRes.id;
		localDoc._rev = couchRes.rev;
        store.dataSourceDidComplete(storeKey, localDoc, couchRes.id);
     } else {
        store.dataSourceDidError(storeKey, response);
     }
  },

  updateRecord: function(store, storeKey) {

  if (SC.kindOf(store.recordTypeFor(storeKey), TagNav.Media)) {
	var id = encodeURIComponent(store.idFor(storeKey));
    var dataHash = store.readDataHash(storeKey);
    SC.Request.putUrl(this.getServerPath(id)).json()
              .header('Accept', 'application/json')
              .notify(this, this.didUpdateMedia, store, storeKey)
              .send(dataHash);
     return YES;
   }
   return NO;
 },

 didUpdateMedia: function(response, store, storeKey) {
   var couchRes = this.processResponse(response);
   if (couchRes.ok) {
	 // Update the local _rev of this document.
	 var localDoc = store.readDataHash(storeKey);
	 localDoc._rev = couchRes.rev;
     store.dataSourceDidComplete(storeKey, localDoc) ;
   } else {
     store.dataSourceDidError(storeKey);
   }
 },

  destroyRecord: function(store, storeKey) {

    if (SC.kindOf(store.recordTypeFor(storeKey), TagNav.Media)) {
	  var id = encodeURIComponent(store.idFor(storeKey));
	  //var rev = this._docsRev[id];	
	  var dataHash = store.readDataHash(storeKey);
	  var rev = this.getDocRev(dataHash);
      SC.Request.deleteUrl(this.getServerPath(id + "?rev=" + rev)).json()
                .header('Accept', 'application/json')
                .notify(this, this.didDeleteMedia, store, storeKey)
                .send();
       return YES;
     }	

     return NO ; // We do not support the record type
  },

  didDeleteMedia: function(response, store, storeKey) {
	var couchRes = this.processResponse(response);  
	if (couchRes.ok) {
	    store.dataSourceDidDestroy(storeKey);
	  } else {
		store.dataSourceDidError(response);	
	  }
  }

}) ;