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

  photoClicked_single: function() {
    var photoInfo = this.get('selectedPhoto');
    $.fancybox({
            //'orig'            : $(this),
            'padding'       : 0,
            'href'          : photoInfo.get('largeUrl'),
            'title'         : photoInfo.get('titke'),
            'transitionIn'  : 'elastic',
            'transitionOut' : 'elastic'
    });
  },
		
  photoClicked: function() {
	var photoInfo = this.get('selectedPhoto');
	var albumInfo = TagNav.picasaAlbumController.get('content');
	
	var photoArray = [];
	for (var i=0; i<albumInfo.photos.length; i++) {
		var p = albumInfo.photos[i];
		var photoAndTitle = { href: p.get('largeUrl'), title: p.get('title') };
		photoArray.pushObject(photoAndTitle);
	}
	var currPhotoIndex = albumInfo.photos.indexOf(photoInfo);
	
	$.fancybox(photoArray,
		{
        //'orig'            : $(this),
        'padding'       : 0,
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic',
        'type': 'image',
        'changeFade': 0,
        'index': currPhotoIndex
    });
  }
}) ;
