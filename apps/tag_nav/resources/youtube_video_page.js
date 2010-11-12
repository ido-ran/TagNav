// ==========================================================================
// Project:   TagNav - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

// This page describes the main user interface for your application.  
TagNav.youtubeVideoPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'labelView back mainContent'.w(),

    labelView: SC.LabelView.design({
		layout: { left: 0, height: 30 },
		value: 'Youtube Video View'
	}),
	
    back: SC.ButtonView.design({
      layout: { left: 0, width: 100, height: 40, top: 50 },
	  title: 'go back',
      action: 'goBack',
      target: 'TagNav.releventMediaController',
    }),

    mainContent: SC.ContainerView.design({
	    layout: { left: 0, right: 0, top: 100, bottom: 0 },
	    contentView: SC.LabelView.design({
		  layout: { height: 30, width: 50 },
		  value: 'welcome to YouTube'
	    })
    })
	
  })

});
