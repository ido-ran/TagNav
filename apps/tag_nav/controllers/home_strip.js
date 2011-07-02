// ==========================================================================
// Project:   TagNav.homeStripController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require("controllers/ItemsByTagController");

/* @class

  Define a tag with albums to show in the welcome screen
*/
TagNav.HomeTagItem = SC.Object.extend({
  tag: null,
  albums: null	
});

/** @class

  Controller for handling the home screen album strips

  @extends SC.Object
*/
TagNav.homeStripController = SC.ArrayController.create(
/** @scope TagNav.homeStripController.prototype */ {

	allMedia: null,
	allMediaBinding: 'TagNav.navigatorController.content',
	homeLabels: null,

	_allMediaStatusChanged: function() {
		var s = this.getPath('allMedia.status');
		console.log(['status', s]);
		if (s === SC.Record.READY_CLEAN) this._buildHomeDataStructure();
	}.observes('*allMedia.status'),
	
	_buildHomeDataStructure: function() {
		var medias = this.get('allMedia');
		var homeLabels = this.get('homeLabels');
		var mediaByTag = {};

      	medias.forEach(function (item) {
			for (var labelIdx = 0; labelIdx < homeLabels.length; labelIdx++) {
				tag = homeLabels[labelIdx];
        		var itemTags = item.get('tags');
        		var hasTheTag = (-1 != itemTags.indexOf(tag));

        		if (hasTheTag) {
					if (mediaByTag[tag] === undefined) mediaByTag[tag] = [];
					if (mediaByTag[tag].length < 6) {
          				// Add the media to relevent media array.
						mediaByTag[tag].pushObject(item);
						break;
					}
        		}
			}
      	});

		var homeTags = [];
		for (var tag in mediaByTag) {
			var tagItem = TagNav.HomeTagItem.create();
			tagItem.set('tag', tag);
			tagItem.set('albums', mediaByTag[tag]);

			homeTags.push(tagItem);
			console.log(['item', tagItem]);
		}
		this.set('content', homeTags);
	}
}) ;
