// ==========================================================================
// Project:   TagNav.Media
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a picasa photo information.

  @extends SC.Record
  @version 0.1
*/
TagNav.PicasaPhoto = SC.Object.extend(
/** @scope TagNav.Media.prototype */ {

  title: null,
  content: null,

  thumbnailUrl: function() {
	return "%@?imgmax=200&crop=1".fmt(this.get('content'));
  }.property('content').cacheable(),

  largeUrl: function() {
	return "%@?imgmax=800&crop=1".fmt(this.get('content'));
  }.property('content').cacheable()

}) ;
