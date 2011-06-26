// ==========================================================================
// Project:   TagNav.picasaAlbumMgr
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Manage loading of PicasaWeb album information

  @extends SC.Object
*/
TagNav.picasaAlbumMgr = SC.Object.create(
/** @scope TagNav.picasaAlbumMgr.prototype */ {

  albums: {},

  getAlbum: function(user, albumID, tempTitle) {
	var albums = this.get('albums'),
	    key = user + ":" + albumID;
	var album = albums[key];
	if (album != null) return album;
	
	album = TagNav.PicasaAlbum.create();
	album.set('title', tempTitle);

    albums[key] = album;
	
	// Start async get
	var albumUrl = 'http://picasaweb.google.com/data/feed/api/user/%@/album/%@'.fmt(user, albumID);
	$.ajax({
		url: albumUrl + '?alt=json',
		dataType: 'jsonp',
		success: function(data) {
			SC.run(function() {
				try {
				// Extract the album cover
				var icon = data.feed.icon.$t.replace(new RegExp("/s160-c/", "g"), "/");
				icon = icon + '?imgmax=200&crop=1';
				album.set('thumbnailUrl', icon);
			    SC.imageQueue.loadImage(icon);

				// Extract the album name
				var title = data.feed.title.$t;
				album.set('title', title);

				// Extract entries
				album.set('numphotos', data.feed.gphoto$numphotos.$t);
				
				data.feed.entry.forEach(function(e, i) {
				  var photo = TagNav.PicasaPhoto.create();
				  photo.set('title', e.title.$t);
				  photo.set('content', e.content.src);
				  album.photos.pushObject(photo);
				
				  // Limit the thumbnails to be the first 10 photos
				  if (album.thumbnailPhotos.length < 10) {
				    // Start caching the image
				    album.thumbnailPhotos.pushObject(photo);
				    SC.imageQueue.loadImage(photo.get('smallThumbnailUrl'));
			      }
				});
				
				// Extract slide show link
				var links = data.feed.link;
				links.forEach(function(link) {
				  if (link.rel == 'http://schemas.google.com/photos/2007#slideshow') {
					album.set('slideshowUrl', link.href);
				  }	
				});
		        }
		        catch (err) {
			      console.log('Error in %@ - %@'.fmt(albumID, err.description));
				  album.set('title', 'ERROR');
		        }
			});
	    }
	});
	
    return album;
  }
}) ;
