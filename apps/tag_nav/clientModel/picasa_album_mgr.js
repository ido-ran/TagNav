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
	var self = this;
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
				  photo.set('album', album);
				  photo.set('title', e.title.$t);
				  photo.set('content', e.content.src);
				  album.photos.pushObject(photo);
				
				  // Limit the thumbnails to be the first 10 photos
				  if (i < 10) {
				    // Start caching the image
					var preload = self.preload;
					if (preload[i] === undefined) preload[i] = [];
					preload[i].pushObject(photo);
					self._preloadLeft++;
					if (!self._isActive) {
						self._isActive = true;
						self.invokeLater(self._loadPreload, 100);
					}
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
				  album.set('title', 'ERROR - ' + album.get('title'));
		        }
			});
	    }
	});
	
    return album;
  },

  /*
  all those methods and fields control the preload of photos so that we always load
  the first photo of each album and only after that we start loading more thumbnails.
  This give the user quick overview of the albums and then allow her to browse using quick look
  using mouse over album.
  */

  _isActive: false,
  _preloadLeft: 0,
  _activePreload: 0,
  preload: {},
  urlToPhotoMap: {},

  _loadPreload: function() {
    var index = 0;
	var photo;
	while (index < 100 && photo === undefined) {
		var q = this.preload[index];
		if (q === undefined || q.length === 0) index++;
		else photo = q.popObject();
	}
		
	if (!photo) {
		this._isActive = false;
	} else {
		this._preloadLeft--;
		this._activePreload++;
		var isBackground = (index != 0);
		var url = photo.get('smallThumbnailUrl');
		this.urlToPhotoMap[url] =  photo;
	    SC.imageQueue.loadImage(url, this, this._imageLoaded);
	}
	
	if (this._activePreload < 4 && this._preloadLeft > 0) this.invokeLater(this._loadPreload, 10);
	else this._isActive = false;
  },

  _imageLoaded: function(url, img) {
	this._activePreload--;
	var urlToPhotoMap = this.urlToPhotoMap;
	var photo = urlToPhotoMap[url];
	delete urlToPhotoMap[url];
	var album = photo.get('album');
	album.thumbnailPhotos.pushObject(photo);

	if (this._activePreload < 4 && this._preloadLeft > 0) this.invokeLater(this._loadPreload, 10);
	else this._isActive = false;
  }
}) ;
