// ==========================================================================
// Project:   TagNav.Media
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a YouTube video information.

  @extends SC.Record
  @version 0.1
*/
TagNav.YouTubeVideo = SC.Object.extend(
/** @scope TagNav.Media.prototype */ {

  /* @public string
  Album title */
  title: null,

  /* @public string
  Album thumbnail url */
  thumbnailUrl: null,

  /* @public string
  video id */
  videoID: null

}) ;
