// ==========================================================================
// Project:   TagNav.adminMediaArrayController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TagNav.adminMediaArrayController = SC.ArrayController.create(
/** @scope TagNav.adminMediaArrayController.prototype */ {

  _isInit: NO,

  initialize: function() {
	if (this._isInit === NO) {
		var q = SC.Query.local(TagNav.Media);
	  	var allMedia = TagNav.store.find(q);
	  	this.set('content', allMedia);

		this._isInit = YES;
	}
  }
}) ;
