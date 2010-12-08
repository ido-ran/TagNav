// ==========================================================================
// Project:   TagNav.youTubeVideoMgr
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Manage loading of YouTube video information

  @extends SC.Object
*/
TagNav.youTubeVideoMgr = SC.Object.create(
/** @scope TagNav.youTubeVideoMgr.prototype */ {

  videos: {},

  getVideo: function(videoID, tempTitle) {
	var videos = this.get('videos');
	var video = videos[videoID];
	if (video != null) return video;
	
	video = TagNav.YouTubeVideo.create();
	video.set('title', tempTitle);
	video.set('videoID', videoID);
	
	// Start async get
	var videoUrl = 'http://gdata.youtube.com/feeds/api/videos/%@'.fmt(videoID);
	$.ajax({
		url: videoUrl + '?alt=json',
		dataType: 'jsonp',
		success: function(data) {
			SC.run(function() {
				// Extract the video info
				var thumbnails = data.entry.media$group.media$thumbnail;
				var icon = thumbnails[0].url;
				video.set('thumbnailUrl', icon);
			
				// Extract the video name
				var title = data.entry.title.$t;
				video.set('title', title);
			});
	    }
	});
	
    videos[videoID] = video;
    return video;
  }
}) ;
