// ==========================================================================
// Project:   TagNav.navigatorController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class
 
 Controller class (not instance) for selecting media items by tag.
 
 @extends SC.ObjectController
 */
TagNav.ItemsByTagController = SC.ObjectController.extend( /** @scope TagNav.navigatorController.prototype */ {

  // The content of this controller is set the array of all the media records.
  // array of strings
  allTags: null,

  // array of strings
  filterByTags: null,
  // array of strings
  tagsInFilter: null,
  // array of strings
  tagsInFilterList: null,

  /* Hold the Media records that are relevent to the tags selected by the user. */
   // array of MediaItem
  releventMedias: null,

  /* This property hold string path to the current main content view */
  mainContentNowShowing: null,

  init: function () {
    sc_super();

    // Initialize all the properties of this controller to new instances.
    // It is important to initalize in init and not on field definition
    // otherwise all inherit objects will point to the same arrays.
    this.allTags = [];
    this.filterByTags = [];
    this.tagsInFilter = [];
    this.releventMedias = [];

    //this._nvgtor_filterByTagsDidChanged();
    this.get("filterByTags").addObserver('[]', this, this._nvgtor_filterByTagsDidChanged);
  },

  clearTags: function() {
	var filterByTags = this.get('filterByTags');
	if (filterByTags.length > 0) filterByTags.removeObjects(filterByTags);
  },

  _tagnav_filterByTags_didReplace: function () {

  }.observes('filterByTags'),

  _nvgtor_filterByTagsDidChanged: function () {
    //console.log('_nvgtor_filterByTagsDidChanged');
    this._calcTagsInFilter();
  },

  observeContent: function () {
    var medias = this.get('content');

    var uniqTags = SC.Set.create();
    medias.forEach(function (item) {
      var tags = item.get('tags');
      tags.forEach(function (tag) {
        uniqTags.push(tag);
      });
    });

    // sort the unique tags
    var sortTags = uniqTags.toArray().sort(function (x, y) {
      return SC.compare(x, y);
    });
    this.set('allTags', sortTags);

    //console.log('calling _calcTagsInFilter');
    this._calcTagsInFilter();
  }.observes("content"),

  _calcTagsInFilter: function () {
    var self = this;
    var medias = this.get('content');
    var filterByTags = this.get('filterByTags');
    var tagsInFilter = this.get('tagsInFilter');
    var releventMedias = this.get('releventMedias');
	//console.log(['foreachMedia', this]);
    // clear all
    //tagsInFilter.removeObjects(tagsInFilter);
    releventMedias.removeObjects(releventMedias);

    var uniqTags = {};
    var uniqMedia = SC.Set.create();

    if (filterByTags == null || filterByTags.length == 0) {
      if (medias != null) {
        medias.forEach(function (item) {
          self._addToTagHash(uniqTags, item.get('tags'), filterByTags);
        });
        this.filterTagsDidClear();
      }
    }
    else {
      medias.forEach(function (item) {
        var itemTags = item.get('tags');
        var hasAllTags = filterByTags.every(function (v) {
          for (var i = 0; i < itemTags.length; i++) {
            if (SC.isEqual(itemTags[i], v)) return true;
          }
          return false;
        });

        if (hasAllTags) {
          // Add the media to relevent media array.
          uniqMedia.push(item);

          // Add the tags of this item
          self._addToTagHash(uniqTags, itemTags, filterByTags);
        }
      });
      this.filterTagsDidChanged(filterByTags);
      //SC.routes.set('location', 'tags/%@'.fmt(filterByTags.toString()));
    }

    // remove tags we already filter by.
    this.set('tagsInFilter', uniqTags);

	var tagNameList = [];
	for (var tagName in uniqTags) {
		tagNameList.push(tagName);
	}
	this.set('tagsInFilterList', tagNameList);

	// Sort the media by date then title
    var unsortMedia = uniqMedia.toArray();
    var sortMedia = TagNav.SortMedia(unsortMedia);
    this.set('releventMedias', sortMedia);
  },

  _addToTagHash: function (tagHash, itemTags, filterByTags) {
    itemTags.forEach(function (tag) {
      if (filterByTags.indexOf(tag) == -1) {
        if (tagHash[tag] === undefined) tagHash[tag] = 1;
        else tagHash[tag] += 1;
      }
    });
  },

  // Called when the filter tags changed
  // filterByTags: array of the tags the controller is filtered by.
  filterTagsDidChanged: function(filterByTags) {
  },

  // Called when the filter tags are cleared
  filterTagsDidClear: function() {
  }

});