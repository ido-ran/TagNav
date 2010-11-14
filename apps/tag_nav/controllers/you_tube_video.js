// ==========================================================================
// Project:   TagNav.youTubeVideoController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Hold a single Media item of YouTube video.

  @extends SC.Object
*/
TagNav.youTubeVideoController = SC.ObjectController.create(
/** @scope TagNav.youTubeVideoController.prototype */ {

   youTubeVideoUrl: null,

  __contentDidChanged: function() {
	var media = this.get('content');
	var youTubeID = media.get('videoID');
	var fullUrl = "http://www.youtube.com/embed/%@".fmt(youTubeID);
	this.set('youTubeVideoUrl', fullUrl);
  }.observes('content'),

}) ;
