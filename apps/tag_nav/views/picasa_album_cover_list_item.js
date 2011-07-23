// ==========================================================================
// Project:   TagNav.MediaListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single PicasaWeb album cover in a grid.

  @extends SC.View
*/
TagNav.PicasaAlbumCoverListItemView = SC.View.extend(SC.ContentDisplay,
/** @scope TagNav.MediaListItemView.prototype */ {

  displayProperties: 'isSelected'.w(),

  classNames: ['picasa-album-cover'],

  albumInfo: null,

  render: function(context, firstTime) {
	var isSelected = this.get('isSelected');
	context.setClass('selected', isSelected);
	
	sc_super();
  },

  createChildViews: function(){ 
    var childViews = []; 
    var content = this.get('content'); 
    if(SC.none(content)) return; 

    // Split the media ID which is build from user/album format.
    var splitID = content.get('id').split('/');
	var albumUser = splitID[0];
	var albumID = splitID[1];
	var albumInfo = TagNav.picasaAlbumMgr.getAlbum(albumUser, albumID, content.get('title'));
    this.albumInfo = albumInfo;

    var backThumbnailView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.thumbnailUrl', albumInfo)
      }) 
    ); 
    childViews.push(backThumbnailView);

    var photoView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.activeThumbnailUrl', albumInfo)
      }) 
    ); 
    childViews.push(photoView);

    var titleView = this.createChildView( 
      SC.View.extend({ 
		classNames: 'media-title'.w(),
        layout: { bottom: 0, centerX: 0, width: 200, height: 40 }, 
        childViews: 'lbl'.w(),
        lbl: SC.LabelView.design({
	        layout: { left: 5, right: 5, top: 0, bottom: 5 },
	      	content: albumInfo, 
	        valueBinding: SC.binding('.title', albumInfo),
			textAlign: SC.ALIGN_CENTER
        })
      }) 
    );

    childViews.push(titleView); 

    var picasaLogoView = this.createChildView(
	  SC.ImageView.extend({
	    layout: { top: 5, right: 20, width: 26, height: 26 },
	    value: static_url('picasa.gif')	
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
  },

  mouseEntered: function(evt) {
  },

  mouseExited: function(evt) {
	var albumInfo = this.albumInfo;
	if (albumInfo == null) return;
	if (albumInfo.thumbnailPhotos == null) return;
	albumInfo.set('activeThumbnailIndex', (-1));
  },

  mouseMoved: function(evt) {
	var albumInfo = this.albumInfo;
	if (albumInfo == null) return;
	if (albumInfo.thumbnailPhotos == null) return;

	var l = this.get('layer');
	if (l == null) return;
	var left = 0;
	var width = l.offsetWidth;
	
	var point = this.convertFrameFromView({ x: evt.pageX, y: evt.pageY }, null);
	var frame = this.get('frame');
//	point.x -= frame.x; point.y -= frame.y;
	var mouseX = point.x;
	var photoCount = albumInfo.thumbnailPhotos.length;
	
	var photoSliceWidth = width / photoCount;
	var photoIndex = ((mouseX - left) / photoSliceWidth);
	photoIndex = Math.round(photoIndex);
	
	console.log(['move', left, mouseX, photoIndex]);
	albumInfo.set('activeThumbnailIndex', photoIndex);
  }
});
