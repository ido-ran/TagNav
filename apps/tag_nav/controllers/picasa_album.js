// ==========================================================================
// Project:   TagNav.picasaWebController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Manage a single picasa web album.

  @extends SC.Object
*/
TagNav.picasaAlbumController = SC.ObjectController.create(
/** @scope TagNav.picasaWebController.prototype */ {

  mainContentNowShowing: null,
  isSlideShowActive: NO,
  slideShowUrl: null,

  __contentDidChanged: function() {
	var albumInfo = this.get('content');
	TagNav.picasaPhotosController.set('content', albumInfo.photos);
	this.set('isSlideShowActive', NO);
	this.set('slideShowUrl', null);
	this.set('mainContentNowShowing', 'TagNav.picasaAlbumPage.mainPane.picasaAlbumGrid');	
  }.observes('content'),

  startSlideshow: function() {
	var isSlideShowActive = this.get('isSlideShowActive');
	if (isSlideShowActive) {
      this.set('slideShowUrl', null);
      this.set('mainContentNowShowing', 'TagNav.picasaAlbumPage.mainPane.picasaAlbumGrid');
	} else {
	  var slideshowUrl = this.get('content').get('slideshowUrl');
	  this.set('mainContentNowShowing', 'TagNav.picasaAlbumPage.mainPane.slideShowView');
	  this.set('slideShowUrl', slideshowUrl);
    }
    this.set('isSlideShowActive', !isSlideShowActive);
  }

}) ;
