// ==========================================================================
// Project:   TagNav.adminMediaArrayController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  This controller is used by adminMediaPage for the media GridView.
  This controller allow multiple items to be selected in order to change thier properties.

  @extends SC.Object
*/
TagNav.adminMediaArrayController = SC.ArrayController.create(
/** @scope TagNav.adminMediaArrayController.prototype */ {

  allowsMultipleSelection: YES,

/* public members */
  filterByTags: null,


/* private members */
  _isInit: NO,
  _allMedia: null,

  initialize: function() {
	if (this._isInit === NO) {
		var q = SC.Query.local(TagNav.Media);
	  	var allMedia = TagNav.store.find(q);
		this.set('_allMedia', allMedia);

		this._calcTagsInFilter();
		this._isInit = YES;
	}
  },

  _filterByTagsChanged: function() {
	this._calcTagsInFilter();
  }.observes('filterByTags'),

  _reload: function() {
	this._isInit = NO;
	this.initialize();
  },

  _calcTagsInFilter: function () {
	console.log('filtering admin media');
    var self = this;
    var allMedias = this.get('_allMedia');
    var filterByTags = this.get('filterByTags');
	if (!filterByTags) filterByTags = [];
	else filterByTags = filterByTags.split(',');

    var uniqTags = {};
    var uniqMedia = SC.Set.create();

    if (filterByTags == null || filterByTags.length == 0) {
      if (allMedias != null) {
        allMedias.forEach(function (item) {
          self._addToTagHash(uniqTags, item.get('tags'), filterByTags);
        });
		uniqMedia.addEach(allMedias);
      }
    }
    else {
      allMedias.forEach(function (item) {
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
      //this.filterTagsDidChanged(filterByTags);
    }

    // remove tags we already filter by.
 //   this.set('tagsInFilter', uniqTags);

    var unsortMedia = uniqMedia.toArray();
    var sortMedia = TagNav.SortMedia(unsortMedia);
    this.set('content', sortMedia);
  },

  _addToTagHash: function (tagHash, itemTags, filterByTags) {
    itemTags.forEach(function (tag) {
      if (filterByTags.indexOf(tag) == -1) {
        if (tagHash[tag] === undefined) tagHash[tag] = 1;
        else tagHash[tag] += 1;
      }
    });
  },

}) ;
