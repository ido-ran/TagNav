// ==========================================================================
// Project:   TagNav.homeStripController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

sc_require("controllers/ItemsByTagController");

/** @class

  Controller for handling the home screen album strips

  @extends SC.Object
*/
TagNav.homeStripController = TagNav.ItemsByTagController.create(
/** @scope TagNav.homeStripController.prototype */ {

	contentBinding: 'TagNav.navigatorController.content'

}) ;
