// ==========================================================================
// Project:   TagNav
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
TagNav = SC.Application.create(
  /** @scope TagNav.prototype */ {

  NAMESPACE: 'TagNav',
  VERSION: '0.1.0',

  // Uncomment this line to use fixture data source.
  //store: SC.Store.create().from(SC.Record.fixtures)

  // CouchDB data source
  store: SC.Store.create({
	commitRecordsAutomatically: NO
  }).from("TagNav.CouchDbDataSource")
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;
