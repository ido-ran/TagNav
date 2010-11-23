// ==========================================================================
// Project:   TagNav.navigatorController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Root controller for the application.

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

  /* This property hold string path to the current main content view */
  mainContentNowShowing: null,

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
	var self = this;
    var medias = this.get('content');
	var filterByTags = this.get('filterByTags');
	var tagsInFilter = this.get('tagsInFilter');
	var releventMedias = this.get('releventMedias');
	
	// clear all
	//tagsInFilter.removeObjects(tagsInFilter);
	releventMedias.removeObjects(releventMedias);

    var uniqTags = {};
	var uniqMedia = SC.Set.create();

	if (filterByTags == null || filterByTags.length == 0) {
		this.set('mainContentNowShowing', 'TagNav.mainPage.mainPane.welcomeView');
		if (medias != null) {
		  medias.forEach(function(item) {
		    self.addToTagHash(uniqTags, item.get('tags'), filterByTags);
 	      });
        }
 	} else {
	  this.set('mainContentNowShowing', 'TagNav.mainPage.mainPane.mediaGrid');
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
			self.addToTagHash(uniqTags, itemTags, filterByTags);
		}
	  });
    }

	// remove tags we already filter by.
	this.set('tagsInFilter', uniqTags);
	
	var x = uniqMedia.toArray();
	// TODO: sort
    this.set('releventMedias', x);
  },

  addToTagHash: function(tagHash, itemTags, filterByTags) {
	itemTags.forEach(function(tag) {
	  if (filterByTags.indexOf(tag) == -1) {
		  if (tagHash[tag] === undefined) tagHash[tag]=1;
		  else tagHash[tag] += 1;
	  }
	});
  }

}) ;
