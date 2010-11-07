// ==========================================================================
// Project:   TagNav.MediaListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
TagNav.MediaListItemView = SC.View.extend(
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

    var albumUrl = content.get('url');
	$.ajax({
		url: albumUrl + '?alt=json',
		dataType: 'jsonp',
		success: function(data) {
			// Take the largest thumbnail (there are usually 3).
			//var thumbnails = data.feed.entry[0].media$group.media$thumbnail;
			//var icon = thumbnails[thumbnails.length-1].url;
			var icon = data.feed.icon.$t.replace(new RegExp("/s160-c/", "g"), "/");
			icon = icon + '?imgmax=200&crop=1';
			photoView.set('value', icon);
	    }
	});


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

    this.set('childViews', childViews); 
  } 

});
