// ==========================================================================
// Project:   TagNav.releventMediaController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require('resources/picasa_album_page');

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
	if (selMedia === null) return;

	if (selMedia.get('type') == TagNav.MediaTypes.PICASAWEB) {
	  // showing picasaweb album
      var splitID = selMedia.get('id').split('/');
	  var albumUser = splitID[0];
	  var albumID = splitID[1];

	  //SC.routes.set('location', 'picasa/%@/%@'.fmt(albumUser, albumID));
	  TagNav.sendAction('picasa', this, { userID: albumUser, albumID: albumID });
	} else 	if (selMedia.get('type') == TagNav.MediaTypes.YOUTUBE) {
	  // showing youtube video
	  var videoID = selMedia.get('id');
	  //SC.routes.set('location', 'youtube/%@'.fmt(videoID));
      TagNav.sendAction('youtube', this, { videoID: videoID });
	}
	
  }

}) ;
