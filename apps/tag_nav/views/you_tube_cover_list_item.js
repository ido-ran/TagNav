// ==========================================================================
// Project:   TagNav.MediaListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single YouTube video cover in a grid.

  @extends SC.View
*/
TagNav.YouTubeCoverListItemView = SC.View.extend(
/** @scope TagNav.MediaListItemView.prototype */ {

  createChildViews: function(){ 
    var childViews = []; 
    var content = this.get('content'); 
    if(SC.none(content)) return; 

	var videoID = content.get('url');
	var videoInfo = TagNav.youTubeVideoMgr.getVideo(videoID, content.get('title'));

    var photoView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.thumbnailUrl', videoInfo)
      }) 
    ); 
    childViews.push(photoView);

    var titleView = this.createChildView( 
      SC.LabelView.extend({ 
        layout: { bottom: 0, centerX: 0, top: 170, width: 200, height: 30 }, 
        content: videoInfo, 
        valueBinding: SC.binding('.title', videoInfo),
		textAlign: SC.ALIGN_CENTER
      }) 
    ); 

    if (-1 == titleView.classNames.indexOf('image-label')) {
	  titleView.classNames.push('image-label');
    }
    childViews.push(titleView); 

    this.set('childViews', childViews); 
  } 

});
