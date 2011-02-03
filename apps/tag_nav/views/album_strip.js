// ==========================================================================
// Project:   TagNav.AlbumStripView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Display album in single strip by tag

  @extends SC.View
*/
TagNav.AlbumStripView = SC.View.extend(
/** @scope TagNav.AlbumStripView.prototype */ {

  // @private
  _label: null,
  _strip: null,

  createChildViews: function(){
    var view, childViews = [];
    var that = this;

    // First, Build the LabelView on the left
    view = this._label = this.createChildView( 
      SC.LabelView.design( {
        layout: {left: 0, top: 0, width: 100, bottom: 0},
        classNames: ['albumStrip-label'],
        valueBinding: 'TagNav.homeStripController.filterByTags'
      })
    );
	this._label.set('value', 'test');
    childViews.push(view);

    // Then the album strip container
    view = this._strip = this.createChildView( 
      SC.ScrollView.design({
	    layout: {left: 100, top: 0, bottom: 0, right: 0 },
	    hasHorizontalScroller: YES,
        hasVerticalScroller: NO,
	    borderStyle: SC.BORDER_NONE,

		contentView: SC.GridView.design({
		  layout: { height: 200 },
		  backgroundColor: 'black',
		  contentBinding: 'TagNav.homeStripController.releventMedias',
		  selectionBinding: 'TagNav.releventMediaController.selection',
		  contentValueKey: 'title',
		  columnWidth: 200,
		  rowHeight: 200,
		  isEditable: NO,
		  contentExampleViewKey: 'createCoverExampleView',
	      action: 'mediaSelected',
	      target: 'TagNav.releventMediaController',
	      actOnSelect: YES
	    })
	 })
    );
    childViews.push(view);

    this.set('childViews', childViews);
    sc_super();
  }

});
