// ==========================================================================
// Project:   TagNav - adminMediaPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

// This page describes the administrator login user interface
TagNav.adminLoginPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'backgroundView topBar mainContent'.w(),
	defaultResponder: TagNav,

	backgroundView: SC.View.design({
		backgroundColor: 'black'
	}),
	
	topBar: SC.ToolbarView.design({
	  layout: { top: 0, left: 0, right: 0, height: 50 },
	  anchorLocation: SC.ANCHOR_TOP,
	  childViews: 'labelView'.w(),
	
	    labelView: SC.LabelView.design({
			layout: { left: 0, height: 30 },
			value: 'PhotoBook Admin'
		})
    }),
	
    mainContent: SC.View.design({
	  layout: { centerX: 0, centerY: 0, width: 300, height: 200 },
	  classNames: 'login-form-view'.w(),
	  childViews: 'userLabel userText passLabel passText loginButton'.w(),

      userLabel: SC.LabelView.design({
	    layout: { left: 10, width: 100, height: 30, top: 55 },
	    value: 'Username'
      }),

      userText: SC.TextFieldView.design({
	    layout: { left: 110, height: 30, width: 100, top: 50 },
	    valueBinding: 'TagNav.adminLoginController.username'
      }),

      passLabel: SC.LabelView.design({
	    layout: { left: 10, width: 100, height: 30, top: 105 },
	    value: 'Password'
      }),

      passText: SC.TextFieldView.design({
	    layout: { left: 110, height: 30, width: 100, top: 100 },
	    isPassword: YES,
	    valueBinding: 'TagNav.adminLoginController.password'
      }),

      loginButton: SC.ButtonView.design({
	    layout: { bottom: 10, left: 10, width: 100, height: 26 },
	    title: 'login',
	    isDefault: YES,
	    action: 'authenticate',
	    target: TagNav.adminLoginController
      })

	  
	}),
  })

});
