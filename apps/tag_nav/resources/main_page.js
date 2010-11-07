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
    childViews: 'labelView bc mediaGrid'.w(),

    labelView: SC.LabelView.design({
		layout: { left: 0, height: 30 },
		value: 'Breadcrumb Tag Control'
	}),
	
    bc: TagNav.TagBc.design({
      layout: { left: 0, right: 0, height: 50, top: 50 },
	  tagsBinding: 'TagNav.navigatorController.filterByTags',
	  tagsToAddBinding: 'TagNav.navigatorController.tagsInFilter'
    }),

    mediaGrid: SC.GridView.design({
	  layout: { left: 0, right: 0, top: 100, bottom: 30 },
	  contentBinding: 'TagNav.releventMediaController.arrangedObjects',
	  contentValueKey: 'title',
	  columnWidth: 200,
	  rowHeight: 200,
	  isSelectable: NO,
	  isEditable: NO,
      exampleView: TagNav.MediaListItemView
    })
  })

});
