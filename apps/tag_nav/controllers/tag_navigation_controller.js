// ==========================================================================
// Project:   TagNav.tagNavigationController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TagNav.tagNavigationController = SC.ArrayController.create(
/** @scope TagNav.tagNavigationController.prototype */ {

  contentBinding: 'TagNav.navigatorController.tagsInFilterList',
  orderBy: '.',

  selectedTag: null,
  selectedTagBinding: SC.Binding.single('TagNav.tagNavigationController.selection'),

  /* This function keep the tags order by lexal ordering */
  orderBy: function(x, y) {
	return SC.compare(x, y);
  },

  tagSelected: function() {
	var selTag = this.get('selectedTag');
	if (selTag === null) return;

	TagNav.navigatorController.filterByTags.pushObject(selTag);
  }
}) ;
