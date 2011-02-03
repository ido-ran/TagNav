// ==========================================================================
// Project:   TagNav.navigatorController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require("controllers/ItemsByTagController");

/** @class
 
 Root controller for the application.
 
 @extends SC.ArrayController
 */
TagNav.navigatorController = TagNav.ItemsByTagController.create( 
/** @scope TagNav.navigatorController.prototype */ {

  // Called when the filter tags changed
  // filterByTags: array of the tags the controller is filtered by.
  filterTagsDidChanged: function(filterByTags) {
	sc_super();
    TagNav.sendAction('tagsChanged', this, { tags: filterByTags.toString() });
  },

  // Called when the filter tags are cleared
  filterTagsDidClear: function() {
	console.log('sendAction tagsClear');
	sc_super();
	TagNav.sendAction('tagsClear', this);
  }

});