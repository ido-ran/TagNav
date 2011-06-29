/* Global Routes */

TagNav.states = {};

TagNav.states.root = SC.Responder.create({
	name: 'root',
   _activeMediaView: null,

   /* Indication if an admin has been authenticated */
   _isAdminAuth: NO,

	didBecomeFirstResponder: function() {
     console.log('root::didBecomeFirstResponder');
   },

   willLoseFirstResponder: function(responder) {
     console.log('root::willLoseFirstResponder');	
   },

   removeActiveMdiaView: function() {
//	console.log('root::removeActiveMdiaView');
	if (this._activeMediaView != null) {
		this._activeMediaView.remove();
        this._activeMediaView = null;
    }
   },

  goBack: function() {
	//console.log(['root::goBack', this._activeMediaView, 'responder', TagNav.get('firstResponder')]);
	
	this.removeActiveMdiaView();
	if (TagNav.navigatorController.filterByTags.length > 0) {
	  SC.routes.set('location', 'tags/%@'.fmt(TagNav.navigatorController.filterByTags.toString()));
	} else {
	  TagNav.makeFirstResponder(TagNav.states.welcome);
	}
  },

  welcome: function() {
	this.removeActiveMdiaView();
    TagNav.makeFirstResponder(TagNav.states.welcome);
  },

  navigateTo: function(view) {
    var actView = this._activeMediaView;
    if (actView != null) actView.remove();
    this._activeMediaView = view;
    view.append();
  },

  tagsClear: function() {
	TagNav.makeFirstResponder(TagNav.states.welcome);
  },

  tagsChanged: function(sender, args) {
	console.log('tagsChanged - start');
	if (TagNav.get('firstResponder') !== TagNav.states.mediaGrid) {
		console.log('tagsChanged - remove active media view');
		TagNav.states.root.removeActiveMdiaView();
		TagNav.makeFirstResponder(TagNav.states.mediaGrid);
	}

	var tags = args.tags;
	var navTags = TagNav.navigatorController.get('filterByTags');
	
	console.log('tagsChanged - tags:%@'.fmt(tags));
	
	// If the tags in the arguments is different from the tags in the controller
	// it means we are responding to route of tags. So we reset the tags in the controller
	// to reflect the request from the route in the display.
	if (tags != navTags.toString()) {
		console.log('tagsChanged - tags are different from filterByTags');
		// Clear the current tags
		while (navTags.length > 0) navTags.popObject();

		// Add argument tags
		var tagArray = tags.split(',');
		for (var i = 0; i < tagArray.length; i++) {
         navTags.pushObject(tagArray[i]);
       }
	} else {
		console.log('tagsChanged - tags are NOT different from filterByTags');
	}

    // We update the route to reflect the currently filter tags.
    SC.routes.set('location', 'tags/%@'.fmt(tags));
  },

  picasa: function(sender, args) {
    TagNav.makeFirstResponder(TagNav.states.picasaAlbum);
	
	var albumUser = args.userID;
	var albumID = args.albumID;
	
	SC.routes.set('location', 'picasa/%@/%@'.fmt(albumUser, albumID));

	var albumInfo = TagNav.picasaAlbumMgr.getAlbum(albumUser, albumID);

	TagNav.picasaAlbumController.set('content', albumInfo);
	var view = TagNav.getPath('picasaAlbumPage.mainPane');
	this.navigateTo(view);
  },

  youtube: function(sender, args) {
	TagNav.makeFirstResponder(TagNav.states.youTubeVideo);
	
	var videoID = args.videoID;
	
	SC.routes.set('location', 'youtube/%@'.fmt(videoID));
	
	var videoInfo = TagNav.youTubeVideoMgr.getVideo(videoID);
	TagNav.youTubeVideoController.set('content', videoInfo);
	var view = TagNav.getPath('youtubeVideoPage.mainPane');
	this.navigateTo(view);
  },

  admin: function(sender, args) {
    if (this._isAdminAuth === NO) {
	  this.adminLogin(sender, args);
    } else {
      TagNav.makeFirstResponder(TagNav.states.admin);
      var view = TagNav.getPath('adminMediaPage.mainPane');
      TagNav.adminMediaArrayController.initialize();
      this.navigateTo(view);
    }
  },

  adminLogin: function(sender, args) {
    TagNav.makeFirstResponder(TagNav.states.adminLogin);
    var view = TagNav.getPath('adminLoginPage.mainPane');
    this.navigateTo(view);
  },

  adminAuthenticated: function(sender, args) {
    this._isAdminAuth = YES;
    this.admin(sender, args);	
  }

});

/**
Initializing state is used when the application is been initialized
and before the first view is presented.
*/
TagNav.states.initializing = SC.Responder.create({
	name: 'initializing',
	nextResponder: TagNav.states.root,

	didBecomeFirstResponder: function() {
      console.log('initializing::didBecomeFirstResponder');
    },

    willLoseFirstResponder: function(responder) {
      console.log('initializing::willLoseFirstResponder');	
    },
	

   tagsChanged: function() {
     return YES;
   },

   picasa: function() {
     return YES;
   },

   youtube: function() {
     return YES;
   },

   tagsClear: function() {
     return YES;
   }

});

/**
Loaded state is used when the application has been initialized
and before the first view is presented.
*/
TagNav.states.loaded = SC.Responder.create({
	name: 'loaded',
	nextResponder: TagNav.states.root,

	didBecomeFirstResponder: function() {
      console.log('loaded::didBecomeFirstResponder');
    },

    willLoseFirstResponder: function(responder) {
      console.log('loaded::willLoseFirstResponder');	
    }/*,

   tagsClear: function(sender, args) {
	//	console.log('receive welcome action');
		TagNav.states.root.removeActiveMdiaView();
		TagNav.makeFirstResponder(TagNav.states.welcome);
   }*/
});

TagNav.states.welcome = SC.Responder.create({
	name: 'welcome',
	nextResponder: TagNav.states.root,
	
	didBecomeFirstResponder: function() {
      console.log('welcome::didBecomeFirstResponder');
	  SC.routes.set('location', 'welcome');
	  TagNav.navigatorController.set('mainContentNowShowing', 'TagNav.mainPage.mainPane.welcomeView');
	  // Clear any keywords might be in the current filter.
	  TagNav.navigatorController.filterByTags.length = 0;
	},

    willLoseFirstResponder: function(responder) {
      console.log('welcome::willLoseFirstResponder');	
    }

});

TagNav.states.mediaGrid = SC.Responder.create({
	name: 'mediaGrid',
	nextResponder: TagNav.states.root,

	didBecomeFirstResponder: function() {
      console.log('mediaGrid::didBecomeFirstResponder');
	  TagNav.navigatorController.set('mainContentNowShowing', 'TagNav.mainPage.mainPane.mediaGrid');
	},
	
    willLoseFirstResponder: function(responder) {
      console.log('mediaGrid::willLoseFirstResponder');	
    }
	
});

TagNav.mediaResponder = SC.Responder.extend({
	// private methods

  _resetBackUrl: function() {
	TagNav.state.root.removeActiveMdiaView();
	if (TagNav.navigatorController.filterByTags.length > 0) {
	  SC.routes.set('location', 'tags/%@'.fmt(TagNav.navigatorController.filterByTags.toString()));
	} else {
	  TagNav.makeFirstResponder(TagNav.states.welcome);
	}
  }

  /*
  I've remove this handlers to allow change in route to go back from media view to grid view.
  tagsClear: function() {
	// Ignore tags changes when inside a media resppnder.
  },

  tagsChanged: function(sender, args) {
	// Ignore tags changes when inside a media resppnder.
  }
  */
});

TagNav.states.picasaAlbum = TagNav.mediaResponder.create({
	name: 'picasaAlbum',
	nextResponder: TagNav.states.root,

	didBecomeFirstResponder: function() {
      console.log('picasaAlbum::didBecomeFirstResponder');
    },

    willLoseFirstResponder: function(responder) {
      console.log('picasaAlbum::willLoseFirstResponder');	
    }
	
});

TagNav.states.youTubeVideo = TagNav.mediaResponder.create({
	name: 'youTubeVideo',
	nextResponder: TagNav.states.root,

	didBecomeFirstResponder: function() {
      console.log('youTubeVideo::didBecomeFirstResponder');
    },

    willLoseFirstResponder: function(responder) {
      console.log('youTubeVideo::willLoseFirstResponder');	
    }
	
});

TagNav.states.admin = TagNav.mediaResponder.create({
	name: 'admin',
	nextResponder: TagNav.states.root,

  tagsClear: function() {
	// Ignore tags changes when inside admin resppnder.
  },

  tagsChanged: function(sender, args) {
	// Ignore tags changes when inside admin resppnder.
  }
});

TagNav.states.adminLogin = TagNav.mediaResponder.create({
	name: 'adminLogin',
	nextResponder: TagNav.states.root
});