// ==========================================================================
// Project:   TagNav.adminLoginController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TagNav.adminLoginController = SC.ObjectController.create(
/** @scope TagNav.adminLoginController.prototype */ {

  username: null,
  password: null,
  isAuthenticating: NO,
  isAuthenticated: NO,

  authenticate: function() {
	if (this.get('isAuthenticating') == YES) {
		alert('already authenticating');
		return;
	}
	this.set('isAuthenticating', YES);
	this.set('isAuthenticated', NO);
	
	var username = this.get('username');
	var password = this.get('password');
	this.set('password', null);
	
	/*
	var body = 'name=%@&password=%@'.fmt(username, password);
	SC.Request.postUrl('server/_seesion')
	          .header('Content-Type', 'application/x-www-form-urlencoded')
	          .notify(this, '_didAuth')
	          .send(body);
	*/
	$.ajax({
	        type: "POST", url: "_session", dataType: "json",
	        data: {name: username, password: password},
			
			success: function(resp) {
			  SC.run(function() {
	            TagNav.adminLoginController.set('isAuthenticated', YES);
				TagNav.sendAction('adminAuthenticated');
			  });
			},
			
			error: function(jqXHR, textStatus, errorThrown) {
			  SC.run(function() {
				TagNav.adminLoginController.set('isAuthenticating', NO);
				alert('error ' + errorThrown);
			  });				
			}
	
/*	        complete: function(req) {
		return;
			  SC.run(function() {
				  TagNav.adminLoginController.set('isAuthenticating', NO);
				console.log(['response', req]);
		          var resp = $.httpData(req, "json");
		          if (req.status == 200) {
		            TagNav.adminLoginController.set('isAuthenticated', YES);
					TagNav.sendAction('adminAuthenticated');
		          } else {
		            //options.error(req.status, resp.error, resp.reason);
					alert('error ' + resp.error);
		          }
              })
	        }
	*/
	 });
  },

}) ;
