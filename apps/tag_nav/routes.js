TagNav.routes = SC.Object.create({

  setup: function () {
    SC.routes.add('tags/:tags', TagNav.routes, 'tagsRoute');
    SC.routes.add('picasa/:userID/:albumID', TagNav.routes, 'picasaRoute');
    SC.routes.add('youtube/:videoID', TagNav.routes, 'youtubeRoute');
    SC.routes.add('welcome', TagNav.routes, 'welcomeRoute');
    SC.routes.add('admin', TagNav.routes, 'adminRoute');
  },

  /**
   called when the initialization of the application complete.
   */
  initializeDidComplete: function () {
    // If we have hash part we navigate to it,
    // otherwise we start from the top.
    var l = SC.routes.get('location');
    console.log(['init_route', l, 'isEmpty', SC.empty(l)]);
    if (SC.empty(l)) {
	  TagNav.sendAction('welcome', this);
    } else {
      SC.routes.trigger();
    }
  },

  tagsRoute: function (route) {
	console.log(['tagsRoute', route]);
	var tags = route.tags;
	if (SC.empty(tags) || tags == "") {
      console.log('tagsRoute - send action tagsClear');
	  TagNav.sendAction('tagsClear', this);
	} else {
	  console.log('tagsRoute - send action tagsChanged');
      TagNav.sendAction('tagsChanged', this, { tags: route.tags });
    }
  },

  picasaRoute: function (route) {
    TagNav.sendAction('picasa', this, { userID: route.userID, albumID: route.albumID });
  },

  youtubeRoute: function (route) {
    TagNav.sendAction('youtube', this, { videoID: route.videoID });
  },

  welcomeRoute: function (route) {
	//console.log('activate welcomeRoute');
    TagNav.sendAction('welcome', this);
  },

  adminRoute: function (route) {
	//console.log('activate adminRoute');
    TagNav.sendAction('admin', this);
  }
});