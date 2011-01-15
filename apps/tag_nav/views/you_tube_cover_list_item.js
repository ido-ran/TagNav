// ==========================================================================
// Project:   TagNav.MediaListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single YouTube video cover in a grid.

  @extends SC.View
*/
TagNav.YouTubeCoverListItemView = SC.View.extend(SC.ContentDisplay,
/** @scope TagNav.MediaListItemView.prototype */ {

  displayProperties: 'isSelected'.w(),
  
  classNames: ['youtube-album-cover'],

  render: function(context, firstTime) {
	var isSelected = this.get('isSelected');
	context.setClass('selected', isSelected);
	
	sc_super();
  },

  createChildViews: function(){ 
    var childViews = []; 
    var content = this.get('content'); 
    if(SC.none(content)) return; 

	var videoID = content.get('id');
	var videoInfo = TagNav.youTubeVideoMgr.getVideo(videoID, content.get('title'));

    var photoView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.thumbnailUrl', videoInfo)
      }) 
    ); 
    childViews.push(photoView);

    var titleView = this.createChildView( 
      SC.View.extend({ 
        layout: { bottom: 0, centerX: 0, width: 200, height: 40 }, 
        childViews: 'lbl'.w(),
        lbl: SC.LabelView.design({
	        layout: { left: 5, right: 5, top: 0, bottom: 5 },
	      	content: videoInfo, 
	        valueBinding: SC.binding('.title', videoInfo),
			textAlign: SC.ALIGN_CENTER
        })
      }) 
    ); 

    if (-1 == titleView.classNames.indexOf('media-title')) {
	  titleView.classNames.push('media-title');
    }
    childViews.push(titleView); 

    var picasaLogoView = this.createChildView(
	  SC.ImageView.extend({
	    layout: { top: 5, right: 20, width: 26, height: 26 },
	    value: static_url('YouTubeLogo.gif')
	  })
	);
	childViews.push(picasaLogoView);

	var albumMask = this.createChildView(
      SC.ImageView.extend({
	    layout: { top: 0, centerX: 0, width: 200, height: 200 },
	    value: static_url('album_mask.png')
      })
    );
    childViews.push(albumMask);


    this.set('childViews', childViews); 
  } 

});
