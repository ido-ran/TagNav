// ==========================================================================
// Project:   TagNav.PicasaPhotoListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single picasa photo in list view

  @extends SC.View
*/
TagNav.PicasaPhotoListItemView = SC.View.extend(
/** @scope TagNav.PicasaPhotoListItemView.prototype */ {


  createChildViews: function(){ 
    var childViews = []; 
    var content = this.get('content'); 
    if(SC.none(content)) return; 

    var photoView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.thumbnailUrl', content)
      })
    );
    childViews.push(photoView);

    var titleView = this.createChildView( 
      SC.LabelView.extend({ 
        layout: { bottom: 0, centerX: 0, top: 170, width: 200, height: 30 }, 
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
