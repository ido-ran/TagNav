// ==========================================================================
// Project:   TagNav - adminMediaPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

// This page describes the administrator user interface
TagNav.adminMediaPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'backgroundView topBar mainContent'.w(),
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
			value: 'PhotoBook Admin'
		})
    }),
	
	/*
    mainContent: SC.ContainerView.design({
		layout: { left: 0, right: 0, top: 100, bottom: 30 },
		nowShowingBinding: 'TagNav.navigatorController.mainContentNowShowing'
    }),
    */
    mainContent: SC.View.design({
	  layout: { left: 0, right: 0, top: 100, bottom: 30 },
	  childViews: 'mediaGrid editorView'.w(),

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
		
		editorView: SC.View.design({
			
		})
	}),
  })

});
