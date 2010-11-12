// ==========================================================================
// Project:   TagNav.picasaWebController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Manage a single picasa web album.

  @extends SC.Object
*/
TagNav.picasaPhotosController = SC.ArrayController.create(
/** @scope TagNav.picasaWebController.prototype */ {

  selectedPhoto: null,
  selectedPhotoBinding: SC.Binding.single('TagNav.picasaPhotosController.selection'),

  slimbox_config: {
            loop: false,
            overlayOpacity: 0.6,
            overlayFadeDuration: 400,
            resizeDuration: 400,
            resizeEasing: "swing",
            initialWidth: 250,
            initlaHeight: 250,
            imageFadeDuration: 400,
            captionAnimationDuration: 400,
            counterText: "{x}/{y}",
            closeKeys: [27, 88, 67, 70],
            prevKeys: [37, 80],
            nextKeys: [39, 83]
        }, //-- overrule defaults is needed

  photoClicked: function() {
	var photoInfo = this.get('selectedPhoto');
	var albumInfo = TagNav.picasaAlbumController.get('content');
	
	var photoArray = [];
	for (var i=0; i<albumInfo.photos.length; i++) {
		var p = albumInfo.photos[i];
		var photoAndTitle = [p.get('largeUrl'), p.get('title')];
		photoArray.pushObject(photoAndTitle);
	}
	var currPhotoIndex = albumInfo.photos.indexOf(photoInfo);
	
	jQuery.slimbox(photoArray, currPhotoIndex, this.slimbox_config);
  }
}) ;
