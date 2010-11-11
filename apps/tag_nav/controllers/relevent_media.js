// ==========================================================================
// Project:   TagNav.releventMediaController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TagNav.releventMediaController = SC.ArrayController.create(
/** @scope TagNav.releventMediaController.prototype */ {

  selectedMedia: null,
  selectedMediaBinding: SC.Binding.single('TagNav.releventMediaController.selection'),

  contentBinding: 'TagNav.navigatorController.releventMedias',

  // Sent from the medias grid
  mediaSelected: function() {
	var selMedia = this.get('selectedMedia');
	if (selMedia.get('type') == TagNav.MediaTypes.PICASAWEB) {
	  // showing picasaweb album
	} else 	if (selMedia.get('type') == TagNav.MediaTypes.YOUTUBE) {
	  // showing youtube video
	}
	
  },


}) ;
