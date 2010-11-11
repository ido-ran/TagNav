// ==========================================================================
// Project:   TagNav.MediaListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single PicasaWeb album cover in a grid.

  @extends SC.View
*/
TagNav.PicasaAlbumCoverListItemView = SC.View.extend(
/** @scope TagNav.MediaListItemView.prototype */ {

  createChildViews: function(){ 
    var childViews = []; 
    var content = this.get('content'); 
    if(SC.none(content)) return; 

    var photoView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
      }) 
    ); 
    childViews.push(photoView);

    var titleView = this.createChildView( 
      SC.LabelView.extend({ 
        layout: { bottom: 0, centerX: 0, top: 170, width: 200, height: 30 }, 
        content: content, 
        valueBinding: SC.binding('.title', content),
		textAlign: SC.ALIGN_CENTER
      }) 
    ); 

    if (-1 == titleView.classNames.indexOf('image-label')) {
	  titleView.classNames.push('image-label');
    }
    childViews.push(titleView); 

	var albumUrl = content.get('url');
	$.ajax({
		url: albumUrl + '?alt=json',
		dataType: 'jsonp',
		success: function(data) {
			SC.run(function() {
				// Extract the album cover
				var icon = data.feed.icon.$t.replace(new RegExp("/s160-c/", "g"), "/");
				icon = icon + '?imgmax=200&crop=1';
				photoView.set('value', icon);
			
				// Extract the album name
				var title = data.feed.title.$t;
				titleView.set('value', title);
			});
	    }
	});

    this.set('childViews', childViews); 
  } 

});
