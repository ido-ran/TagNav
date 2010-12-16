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

  tagName: 'ul',
  classNames: ['tagcloud-view'],
  tags: {}, // Must be hash between tags and their weight
  minFontSize: 1.4,
  maxFontSize: 6,

  /**
  called when the entier tags collection reassign.
  */
  _tagnav_tagcloud_tagsDidReplace: function() {
	this.updateLayer();
  }.observes('tags'),

  _formatNumberForHuman: function(num) {
    var r;
    if (num === 0) r = 'אפס';
    else if (num === 1) r = 'פריט אחד'
    else if (num === 2) r = 'שני אלבומים'
    else if (num > 2) r = '%@ אלבומים'.fmt(num);
    else r = num.toString();
  
    return r;
  },

  render: function(context, firstTime) {
	var tags = this.get('tags');
	var emptyTagList = true;

    // Check if empty and count min and max occur
    var minOccurs, maxOccurs;
	for (var tag in tags) {
		emptyTagList = false;
		var count = tags[tag];
		
		if (minOccurs === undefined) minOccurs = count;
		else if (minOccurs > count) minOccurs = count;
		
		if (maxOccurs === undefined) maxOccurs = count;
		else if (maxOccurs < count) maxOccurs = count;
    }

	if (emptyTagList) {
		context.push('<span>no more tags, sorry</span>');
	} else {
	  var maxFontSize = this.get('maxFontSize'),
	      minFontSize = this.get('minFontSize');
	  // Build tag cloud
	  for (var tag in tags) {
        var count = tags[tag];
        var weight = (Math.log(count)-Math.log(minOccurs))/(Math.log(maxOccurs)-Math.log(minOccurs));
        var fontSizeOfCurrentTag = minFontSize + Math.round((maxFontSize-minFontSize)*weight);
        var tagClassCut = Math.round((count / maxOccurs) * 5);

	    context.push('<li style="font-size:%@em" title="%@" class="tag tag-%@">%@</li>'.fmt(fontSizeOfCurrentTag, this._formatNumberForHuman(count), tagClassCut, tag));
	  }
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
