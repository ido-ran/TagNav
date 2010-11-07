// ==========================================================================
// Project:   TagNav.navigatorController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TagNav.navigatorController = SC.ObjectController.create(
/** @scope TagNav.navigatorController.prototype */ {

  contentBinding: 'TagNav.allMediaController.arrangedObjects',

  allTags: [],
  
  filterByTags: [],
  tagsInFilter: [],

  /* Hold the Media records that are relevent to the tags selected by the user. */
  releventMedias: [],

  init: function() {
	sc_super();
	
	this._nvgtor_filterByTagsDidChanged();
	this.get("filterByTags").addObserver('[]', this, this._nvgtor_filterByTagsDidChanged);
  },

  _tagnav_filterByTags_didReplace: function() {
	
  }.observes('filterByTags'),

  _nvgtor_filterByTagsDidChanged: function() {
    this._calcTagsInFilter();
  },

  observeContent: function() {
    var medias = this.get('content');

    var uniqTags = SC.Set.create();
    medias.forEach(function(item) {
	  var tags = item.get('tags');
	  tags.forEach(function(tag) {
		 uniqTags.push(tag);
	  });
    });

    // sort the unique tags
    var sortTags = uniqTags.toArray().sort(function(x,y) { return SC.compare(x,y); });
    this.set('allTags', sortTags);

    this._calcTagsInFilter();
  }.observes("content"),

  _calcTagsInFilter: function() {
	var filterByTags = this.get('filterByTags');
	var tagsInFilter = this.get('tagsInFilter');
	var releventMedias = this.get('releventMedias');
	
	// clear all
	tagsInFilter.removeObjects(tagsInFilter);
	releventMedias.removeObjects(releventMedias);

	if (filterByTags == null || filterByTags.get('length') == 0) {
		var allTags = this.get('allTags');
		allTags.forEach(function(val) {
		  tagsInFilter.pushObject(val);	
		});
 	} else {
	  var uniqTags = SC.Set.create();
	  var uniqMedia = SC.Set.create();
	  var medias = this.get('content');

	  medias.forEach(function(item) {
		var itemTags = item.get('tags');
		var hasAllTags = filterByTags.every(function(v) {
		  for (var i=0; i<itemTags.length;i++) {
			if (SC.isEqual(itemTags[i], v)) return true;
		  }
		  return false;	
		});
		
		if (hasAllTags) {
			// Add the media to relevent media array.
			uniqMedia.push(item);

			// Add the tags of this item
			itemTags.forEach(function(tag) {
			  uniqTags.push(tag);	
			});
		}
	  });
	
	  // remove tags we already filter by.
	  var x = uniqTags.toArray();
	  x.removeObjects(filterByTags);
	  this.set('tagsInFilter', x);
	
	  var x = uniqMedia.toArray();
	  // TODO: sort
	  this.set('releventMedias', x);
    }
  },

}) ;
