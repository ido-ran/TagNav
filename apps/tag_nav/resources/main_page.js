// ==========================================================================
// Project:   TagNav - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

// This page describes the main user interface for your application.  
TagNav.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'backgroundView topBar breadcrumb mainContent'.w(),
	defaultResponder: TagNav,

	backgroundView: SC.View.design({
		backgroundColor: 'black'
	}),
	
	topBar: SC.ToolbarView.design({
	  layout: { top: 0, left: 0, right: 0, height: 50 },
	  anchorLocation: SC.ANCHOR_TOP,
	  childViews: 'labelView'.w(),
	
	    labelView: SC.LabelView.design({
			layout: { left: 0, height: 30 },
			value: 'PhotoBook'
		})
    }),
	
    breadcrumb: TagNav.TagBc.design({
      layout: { left: 0, right: 0, height: 30, top: 50 },
	  tagsBinding: 'TagNav.navigatorController.filterByTags',
	  tagsToAddBinding: 'TagNav.navigatorController.tagsInFilter'
    }),

    /*
    The main content is a ContainerView which present either
    1. welcomeView which show album strips
    2. mediaGrid which present media items by tags
    */
    mainContent: SC.ContainerView.design({
		layout: { left: 0, right: 0, top: 100, bottom: 30 },
		nowShowingBinding: 'TagNav.navigatorController.mainContentNowShowing'
    }),

    cloudTagView: TagNav.PopupTagCloud.design({
        layout: { left: 0, right: 0 },
	    tagsBinding: 'TagNav.navigatorController.tagsInFilter'
	}),
	
	welcomeView: SC.View.design({
	  childViews: 'albumStrip1'.w(),
	  
	  albumStrip1: TagNav.AlbumStripView.design({
	    layout: { left: 0, top: 0, right: 0, height: 200 }
      })
	}),

    mediaGrid: SC.ScrollView.design({
	    layout: { left: 0, right: 0, top: 0, bottom: 0 },
	    hasHorizontalScroller: YES,
        hasVerticalScroller: YES,
	    borderStyle: SC.BORDER_NONE,
		
		contentView: SC.GridView.design({
		  backgroundColor: 'black',
		  contentBinding: 'TagNav.releventMediaController.arrangedObjects',
		  selectionBinding: 'TagNav.releventMediaController.selection',
		  contentValueKey: 'title',
		  columnWidth: 200,
		  rowHeight: 200,
		  isEditable: NO,
		  contentExampleViewKey: 'createCoverExampleView',
	      //exampleView: TagNav.PicasaAlbumCoverListItemView,
	      action: 'mediaSelected',
	      target: 'TagNav.releventMediaController',
	      actOnSelect: YES
	    })
	 }),
	
	 picasaAlbumGrid: SC.ScrollView.design({
	    layout: { left: 0, right: 0, top: 0, bottom: 0 },
	    hasHorizontalScroller: YES,
        hasVerticalScroller: YES,
	    borderStyle: SC.BORDER_NONE,

		contentView: SC.GridView.design({
		  contentBinding: 'TagNav.picasaWebController.arrangedObjects',
		  selectionBinding: 'TagNav.picasaWebController.selection',
		  contentValueKey: 'title',
		  columnWidth: 200,
		  rowHeight: 200,
		  isEditable: NO,
	      exampleView: TagNav.PicasaAlbumCoverListItemView,
	      action: 'mediaSelected',
	      target: 'TagNav.releventMediaController',
	      actOnSelect: YES
	    })
	 })
  })

});
