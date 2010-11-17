// ==========================================================================
// Project:   TagNav - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

//sc_require('views/you_tube_video');

// This page describes the main user interface for your application.  
TagNav.youtubeVideoPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'titleView logoView back mainContent'.w(),
	
	logoView: SC.ImageView.design({
		layout: { right: 30, height: 30, top: 0, width: 42 },
		value: static_url('YouTubeLogo.gif')
	}),
	
	titleView: SC.LabelView.design({
	  layout: { right: 75, height: 30, top: 5 },
	  valueBinding: 'TagNav.youTubeVideoController.title',
	  textAlign: SC.ALIGN_RIGHT,
	  fontWeight: SC.BOLD_WEIGHT,
	  classNames: ['page-title']
	}),
	
    back: SC.ButtonView.design({
      layout: { left: 0, width: 100, height: 40, top: 50 },
	  title: 'go back',
      action: 'goBack',
      target: 'TagNav.releventMediaController',
    }),

	mainContent: TagNav.YouTubeVideoView.design({
       layout: { width: 640, height: 505, centerX: 0, centerY: 0 },
       valueBinding: 'TagNav.youTubeVideoController.youTubeVideoUrl'
    })
	
  })

});
