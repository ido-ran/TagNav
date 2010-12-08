/* Global Routes */

TagNav.states = {};

TagNav.states.root = SC.Responder.create({
	name: 'root',
   _activeMediaView: null,

   removeActiveMdiaView: function() {
//	console.log('root::removeActiveMdiaView');
	if (this._activeMediaView != null) {
		this._activeMediaView.remove();
        this._activeMediaView = null;
    }
   },

  goBack: function() {
//	console.log('root::goBack');
	this.removeActiveMdiaView();
  },

  navigateTo: function(view) {
    var actView = this._activeMediaView;
    if (actView != null) actView.remove();
    this._activeMediaView = view;
    view.append();
  },

  welcome: function() {
//	console.log('receive welcome action');
	SC.routes.set('location', 'welcome');
	this.removeActiveMdiaView();
	TagNav.makeFirstResponder(TagNav.states.welcome);
  },

  tags: function(sender, args) {
	if (TagNav.get('firstResponder') !== TagNav.states.mediaGrid) {
		this.removeActiveMdiaView();
		TagNav.makeFirstResponder(TagNav.states.mediaGrid);
	}
	
	var tags = args.tags;
	var navTags = TagNav.navigatorController.get('filterByTags');
	if (tags != navTags.toString()) {
		// Clear the current tags
		while (navTags.length > 0) navTags.popObject();
		
		// Add argument tags
		var tagArray = tags.split(',');
		for (var i = 0; i < tagArray.length; i++) {
          navTags.pushObject(tagArray[i]);
        }
	}

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
  }

});

/**
Initializing state is used when the application is been initialized
and before the first view is presented.
*/
TagNav.states.initializing = SC.Responder.create({
	name: 'initializing',
	nextResponder: TagNav.states.root,
	
   tags: function() {
     return YES;
   },

   picasa: function() {
     return YES;
   },

   youtube: function() {
     return YES;
   },

   welcome: function() {
     return YES;
   }
});

TagNav.states.welcome = SC.Responder.create({
	name: 'welcome',
	nextResponder: TagNav.states.root,
	
	didBecomeFirstResponder: function() {
	  TagNav.navigatorController.set('mainContentNowShowing', 'TagNav.mainPage.mainPane.welcomeView');
	}
});

TagNav.states.mediaGrid = SC.Responder.create({
	name: 'mediaGrid',
	nextResponder: TagNav.states.root,

	didBecomeFirstResponder: function() {
	  TagNav.navigatorController.set('mainContentNowShowing', 'TagNav.mainPage.mainPane.mediaGrid');
	}
});

TagNav.mediaResponder = SC.Responder.extend({
	// private methods

  _resetBackUrl: function() {
	if (TagNav.navigatorController.filterByTags.length > 0) {
	  SC.routes.set('location', 'tags/%@'.fmt(TagNav.navigatorController.filterByTags.toString()));
	  return YES;
	} else {
	  return NO;
	}	
  }
  
});

TagNav.states.picasaAlbum = TagNav.mediaResponder.create({
	name: 'picasaAlbum',
	nextResponder: TagNav.states.root,
	
	goBack: function() {
	  //console.log('picasaAlbum::goBack');
	  return this._resetBackUrl();
	}
});

TagNav.states.youTubeVideo = TagNav.mediaResponder.create({
	name: 'youTubeVideo',
	nextResponder: TagNav.states.root,
	
	goBack: function() {
	  //console.log('picasaAlbum::goBack');
	  return this._resetBackUrl();
	}
});