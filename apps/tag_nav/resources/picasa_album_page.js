// ==========================================================================
// Project:   TagNav - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require('views/picasa_photo_list_item');

// This page describes the main user interface for your application.  
TagNav.picasaAlbumPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'labelView back slideshowButton mainContent'.w(),

    labelView: SC.LabelView.design({
		layout: { left: 0, height: 30 },
		value: 'Picasa Album View'
	}),
	
    back: SC.ButtonView.design({
      layout: { left: 0, width: 100, height: 40, top: 50 },
	  title: 'go back',
      action: 'goBack',
      target: 'TagNav.releventMediaController',
    }),

    slideshowButton: SC.ButtonView.design({
      layout: { left: 130, width: 100, height: 40, top: 50 },
	  title: 'Slideshow',
      action: 'startSlideshow',
      target: 'TagNav.picasaAlbumController',
    }),

    mainContent: SC.ContainerView.design({
	    layout: { left: 0, right: 0, top: 100, bottom: 0 },
	    nowShowingBinding: 'TagNav.picasaAlbumController.mainContentNowShowing'
    }),
	
	picasaAlbumGrid: SC.ScrollView.design({
	    layout: { left: 0, right: 0, top: 0, bottom: 0 },
	    hasHorizontalScroller: YES,
        hasVerticalScroller: YES,
	    borderStyle: SC.BORDER_NONE,

		contentView: SC.GridView.design({
		  contentBinding: 'TagNav.picasaPhotosController.arrangedObjects',
		  selectionBinding: 'TagNav.picasaPhotosController.selection',
          exampleView: TagNav.PicasaPhotoListItemView,
		  columnWidth: 200,
		  rowHeight: 200,
		  isEditable: NO,
	      actOnSelect: YES,
	      target: 'TagNav.picasaPhotosController',
	      action: 'photoClicked'
	    })
	 }),
	
	 slideShowView: SC.WebView.design({
	    layout: { left: 0, right: 0, top: 0, bottom: 0 },
	    valueBinding: 'TagNav.picasaAlbumController.slideShowUrl'
	  })
  })

});
