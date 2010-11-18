// ==========================================================================
// Project:   TagNav.allMediaController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Manage loading of PicasaWeb album information

  @extends SC.Object
*/
TagNav.picasaAlbumMgr = SC.Object.create(
/** @scope TagNav.allMediaController.prototype */ {

  albums: {},

  getAlbum: function(user, albumID, tempTitle) {
	var albums = this.get('albums'),
	    key = user + ":" + albumID;
	var album = albums[key];
	if (album != null) return album;
	
	album = TagNav.PicasaAlbum.create();
	album.set('title', tempTitle);
	
	// Start async get
	var albumUrl = 'http://picasaweb.google.com/data/feed/api/user/%@/album/%@'.fmt(user, albumID);
	$.ajax({
		url: albumUrl + '?alt=json',
		dataType: 'jsonp',
		success: function(data) {
			SC.run(function() {
				// Extract the album cover
				var icon = data.feed.icon.$t.replace(new RegExp("/s160-c/", "g"), "/");
				icon = icon + '?imgmax=200&crop=1';
				album.set('thumbnailUrl', icon);
			    SC.imageCache.loadImage(icon);

				// Extract the album name
				var title = data.feed.title.$t;
				album.set('title', title);
				
				// Extract entries
				album.set('numphotos', data.feed.gphoto$numphotos);
				
				data.feed.entry.forEach(function(e, i) {
				  var photo = TagNav.PicasaPhoto.create();
				  photo.set('title', e.title.$t);
				  photo.set('content', e.content.src);
				  album.photos.pushObject(photo);
				
				  // Start caching the image
				  SC.imageCache.loadImage(photo.get('smallThumbnailUrl'));
				});
				
				// Extract slide show link
				var links = data.feed.link;
				links.forEach(function(link) {
				  if (link.rel == 'http://schemas.google.com/photos/2007#slideshow') {
					album.set('slideshowUrl', link.href);
				  }	
				});
			});
	    }
	});
	
    albums[key] = album;
    return album;
  }
}) ;
