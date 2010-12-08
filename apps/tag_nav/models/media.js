// ==========================================================================
// Project:   TagNav.Media
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require('views/picasa_album_cover_list_item');
sc_require('views/you_tube_cover_list_item');

TagNav.MediaTypes = {
  PICASAWEB: 'picasa',
  YOUTUBE: 'youtube'
};

/** @class

  Media can describe photo album, video clip or audio clip on the web.

  @extends SC.Record
  @version 0.1
*/
TagNav.Media = SC.Record.extend(
/** @scope TagNav.Media.prototype */ {

  primaryKey: "_id",

  title: SC.Record.attr(String),
  type: SC.Record.attr(String),
  tags: SC.Record.attr(Array),

  /* Return the cover list item view
     for specific media type 
  */
  createCoverExampleView: function() {
	var ev, type = this.get('type');
	if (type == TagNav.MediaTypes.PICASAWEB) {
		ev = TagNav.PicasaAlbumCoverListItemView;
	} else if (type == TagNav.MediaTypes.YOUTUBE) {
		ev = TagNav.YouTubeCoverListItemView;
	} else {
		throw "Invalid media type";
	}
	return ev;
  }.property('type').cacheable()
}) ;
