// ==========================================================================
// Project:   TagNav
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
TagNav.main = function main() {

  TagNav.routes.setup();

  TagNav.makeFirstResponder(TagNav.states.initializing);

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  TagNav.getPath('mainPage.mainPane').append() ;

  var q = SC.Query.local(TagNav.Media);
  var allMedia = TagNav.store.find(q);
  TagNav.navigatorController.set('content', allMedia);

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: TagNav.contactsController.set('content',TagNav.contacts);
  TagNav.invokeLast(function() { 
	TagNav.homeStripController.set('filterByTags', ['עמק', '2002']);
	TagNav.makeFirstResponder(TagNav.states.root);
	TagNav.routes.initializeDidComplete();
  });

} ;

function main() { TagNav.main(); }
