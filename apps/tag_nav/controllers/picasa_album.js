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
  isSlideshowActive: NO,

  init: function() {
    sc_super();
    this.set('mainContentNowShowing', 'TagNav.picasaAlbumPage.mainPane.picasaAlbumGrid');	
  },

  __contentDidChanged: function() {
	var albumInfo = this.get('content');
	TagNav.picasaPhotosController.set('content', albumInfo.photos);
  }.observes('content'),

  startSlideshow: function() {
	var isSlideshowActive = this.get('isSlideshowActive');
	if (isSlideshowActive) {
	  var webView = this._webView;
	  webView.set('isVisible', NO);
      var mainContent = TagNav.getPath('picasaAlbumPage.mainPane.mainContent');
	  var photoGridView = TagNav.getPath('picasaAlbumPage.mainPane.picasaAlbumGrid').create();
	  mainContent.set('contentView', photoGridView);
	} else {
	  var slideshowUrl = this.get('content').get('slideshowUrl');
	  var webView = SC.WebView.create();
	  webView.set('value', slideshowUrl);
	  var mainContent = TagNav.getPath('picasaAlbumPage.mainPane.mainContent');
	  mainContent.set('contentView', webView);
	  this._webView = webView;
	  //this.set('mainContentNowShowing', 'TagNav.picasaAlbumPage.mainPane.slideShowView');
	  //var webView = TagNav.getPath('picasaAlbumPage.mainPane.mainContent.contentView');
	  //webView.set('value', slideshowUrl);
    }
    this.set('isSlideshowActive', !isSlideshowActive);
  }

}) ;
