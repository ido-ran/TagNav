// ==========================================================================
// Project:   TagNav.Media
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a picasa album information.

  @extends SC.Record
  @version 0.1
*/
TagNav.PicasaAlbum = SC.Object.extend(
/** @scope TagNav.Media.prototype */ {

  /* @public string
  Album title */
  title: null,

  /* @public string
  Album thumbnail url */
  thumbnailUrl: null,

  /* @public string
  Slideshow url */
  slideshowUrl: null,

  /* @public PicasaPhoto[]
  All the photos in the album */
  photos: null,

  activeThumbnailIndex: -1,
  activeThumbnailUrl: null,

  init: function() {
    sc_super();
    this.photos = [];
  },

   __tagnav_activeThumbnailIndexDidChanged: function() {
	var activeThumbnailIndex = this.get('activeThumbnailIndex');
	if (activeThumbnailIndex == -1) {
	  this.set('activeThumbnailUrl', this.get('thumbnailUrl'));
	} else {
		var photo = this.get('photos').objectAt(activeThumbnailIndex);
		if (photo != null) {
			var photoThumbnail = photo.get('smallThumbnailUrl');
			this.set('activeThumbnailUrl', photoThumbnail);
	    }
	}
   }.observes('activeThumbnailIndex'),

   __tagnav_thumbnailUrlDidChanged: function() {
	this.set('activeThumbnailUrl', this.get('thumbnailUrl'));
   }.observes('thumbnailUrl')
}) ;
