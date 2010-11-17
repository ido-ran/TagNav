// ==========================================================================
// Project:   TagNav - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require('views/picasa_photo_list_item');

// This page describes the main user interface for your application.  
TagNav.picasaAlbumPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'albumTitleView logoView back slideshowButton mainContent'.w(),

	logoView: SC.ImageView.design({
		layout: { right: 30, height: 30, top: 0, width: 30 },
		value: static_url('picasa.gif')
	}),
	
	albumTitleView: SC.LabelView.design({
	  layout: { right: 75, height: 30, left: 300, top: 5 },
	  valueBinding: "TagNav.picasaAlbumController.title",
	  textAlign: SC.ALIGN_RIGHT,
	  fontWeight: SC.BOLD_WEIGHT,
	  classNames: ['page-title']
	}),
	
    back: SC.ButtonView.design({
      layout: { left: 5, width: 100, height: 40, top: 5 },
	  title: 'go back',
      action: 'goBack',
      target: 'TagNav.releventMediaController',
    }),

    slideshowButton: SC.ButtonView.design({
      layout: { left: 130, width: 100, height: 40, top: 5 },
	  title: 'Slideshow',
      action: 'startSlideshow',
      target: 'TagNav.picasaAlbumController',
    }),

    mainContent: SC.ContainerView.design({
	    layout: { left: 0, right: 0, top: 50, bottom: 0 },
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
