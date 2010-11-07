// ==========================================================================
// Project:   TagNav.Media
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Media can describe photo album, video clip or audio clip on the web.

  @extends SC.Record
  @version 0.1
*/
TagNav.Media = SC.Record.extend(
/** @scope TagNav.Media.prototype */ {

  primaryKey: "_id",

  title: SC.Record.attr(String),
  type: SC.Record.attr(String),
  url: SC.Record.attr(String),
  tags: SC.Record.attr(Array)

}) ;
