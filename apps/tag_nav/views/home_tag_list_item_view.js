// ==========================================================================
// Project:   TagNav.HomeTagListItemView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single tag in the home screen which contain few albums associated with that tag.

  @extends SC.View
*/
TagNav.HomeTagListItemView = SC.View.extend(
/** @scope TagNav.HomeTagListItemView.prototype */ {

	backgroundColor: 'black',
	childViews: 'tagImage tagLabel albumsView'.w(),
	
	tagImage: SC.ImageView.design({
		layout: { left: 5, top: 15, height: 30, width: 30 },
		value: static_url('tag.png'),
		useCanvas: NO,
		
		tagBinding: '.parentView.content.tag',
		
		mouseDown: function(evt) {
			var tag = this.get('tag');			
			TagNav.navigatorController.filterByTags.pushObject(tag);
			return YES;
		}
	}),
	
	tagLabel: SC.LabelView.design({
		layout: { left: 50, right: 0, top: 0, height: 48 },
		valueBinding: '.parentView.content.tag',
		classNames: 'homeTagTitle',

		tagBinding: '.parentView.content.tag',
		
		mouseDown: function(evt) {
			var tag = this.get('tag');			
			TagNav.navigatorController.filterByTags.pushObject(tag);
			return YES;
		}
	}),
	
	albumsView: SC.ScrollView.design({
	    layout: { left: 0, right: 0, top: 50, bottom: 0 },
	    hasHorizontalScroller: YES,
        hasVerticalScroller: NO,
	    borderStyle: SC.BORDER_NONE,
		
		contentView: SC.GridView.design({
			backgroundColor: 'black',
			layout: { left: 0, right: 0, top: 0, bottom: 0 },
			contentBinding: '.parentView.parentView.parentView.content.albums',
			contentExampleViewKey: 'createCoverExampleView',
			columnWidth: 200,
  			rowHeight: 200,
		  	selectionBinding: 'TagNav.releventMediaController.selection',
			action: 'mediaSelected',
		    target: 'TagNav.releventMediaController',
		    actOnSelect: YES
		})
	})
});
