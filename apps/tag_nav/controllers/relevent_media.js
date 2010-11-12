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

  _activeMediaView: null,

  // Sent from the medias grid
  mediaSelected: function() {
	var selMedia = this.get('selectedMedia');

	if (selMedia.get('type') == TagNav.MediaTypes.PICASAWEB) {
	  // showing picasaweb album
	  var albumUser = selMedia.get('user');
	  var albumID = selMedia.get('album');
	  var albumInfo = TagNav.picasaAlbumMgr.getAlbum(albumUser, albumID);
	  
	  TagNav.picasaAlbumController.set('content', albumInfo);
	  var view = TagNav.getPath('picasaAlbumPage.mainPane');
	  view.append();
	  this._activeMediaView = view;	
	} else 	if (selMedia.get('type') == TagNav.MediaTypes.YOUTUBE) {
	  // showing youtube video
	  var view = TagNav.getPath('youtubeVideoPage.mainPane');
	  view.append();
	  this._activeMediaView = view;
	}
	
  },

  goBack: function() {
    this._activeMediaView.remove();
    this._activeMediaView = null;
  }


}) ;
