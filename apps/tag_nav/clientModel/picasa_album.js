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

  init: function() {
    sc_super();
    this.photos = [];	
  }
}) ;
