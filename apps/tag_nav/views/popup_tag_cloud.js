// ==========================================================================
// Project:   TagNav.PopupTagCloud
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent the tag-cloud show in the popup of the breadcrumb control

  @extends SC.View
*/
TagNav.PopupTagCloud = SC.View.extend(
/** @scope TagNav.PopupTagCloud.prototype */ {

  tagName: 'div',
  classNames: ['tagcloud-view'],
  tags: {}, // Must be hash between tags and their weight

  /**
  called when the entier tags collection reassign.
  */
  _tagnav_tagcloud_tagsDidReplace: function() {
	console.log('tags changed');
	this.updateLayer();
  }.observes('tags'),

  render: function(context, firstTime) {
	var tags = this.get('tags');
	for (var i in tags) {
	  var tag = i;
      var size = tags[i];
	  context.push('<span style="font-size:%@em" class="tag">%@</span>'.fmt(size,tag));
	}
  },

  mouseDown: function(evt) {
	var elem = evt.target;

	var remTagQry = this.$('.tag');

	for (var i in remTagQry) {
		var remTagElem = remTagQry[i];
		if (elem == remTagElem) {
			var tag = SC.$(remTagElem).text();
			TagNav.navigatorController.filterByTags.pushObject(tag);
			return YES;
        }
	}

	return NO;
  }

});
