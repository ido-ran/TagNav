// ==========================================================================
// Project:   TagNav - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

//sc_require('views/you_tube_video');

// This page describes the main user interface for your application.  
TagNav.youtubeVideoPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'backgroundView topBar videoPreviewImage mainContent'.w(),
	defaultResponder: TagNav,
	
	backgroundView: SC.View.design({
		backgroundColor: 'black'
	}),
	
	topBar: SC.ToolbarView.design({
	  layout: { top: 0, left: 0, right: 0, height: 50 },
	  anchorLocation: SC.ANCHOR_TOP,
	  childViews: 'titleView logoView back'.w(),
    
		logoView: SC.ImageView.design({
			layout: { right: 30, height: 30, centerY: 0, width: 42 },
			value: static_url('YouTubeLogo.gif')
		}),
	
		titleView: SC.LabelView.design({
		  layout: { right: 75, height: 30, left: 300, centerY: 0 },
		  valueBinding: 'TagNav.youTubeVideoController.title',
		  textAlign: SC.ALIGN_RIGHT,
		  fontWeight: SC.BOLD_WEIGHT,
		  classNames: ['page-title']
		}),
	
	    back: SC.ButtonView.design({
	      layout: { centerY: 0, left: 10, width: 100, height: 30 },
		  title: 'go back',
	      action: 'goBack'
	    })
	}),

    videoPreviewImage: SC.ImageView.design({
	  layout: { width: 640, height: 505, centerX: 0, centerY: 0 },
	  valueBinding: 'TagNav.youTubeVideoController.thumbnailUrl'
    }),

	mainContent: TagNav.YouTubeVideoView.design({
       layout: { width: 640, height: 505, centerX: 0, centerY: 0 },
       valueBinding: 'TagNav.youTubeVideoController.youTubeVideoUrl'
    })
	
  })

});
