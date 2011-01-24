// ==========================================================================
// Project:   TagNav.adminMediaController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TagNav.adminMediaController = SC.ObjectController.create(
/** @scope TagNav.adminMediaController.prototype */ {

  contentBinding: SC.Binding.single('TagNav.adminMediaArrayController.selection'),

  /* Editable properties of media */
  editableTags: null,

  /* YES if there is something to save, NO otherwise */
  isAbleToSave: NO,

  hasMediaToEdit: NO,

  /* The URL for the new media */
  newMediaUrl: '',

  saveMedia: function() {
    var media = this.get('content');
    var tagsArray = this.get('editableTags').split(',');
    media.set('tags', tagsArray);
    media.commitRecord();
  },

  showAddNewDialog: function() {
	var newDialog = TagNav.getPath('adminMediaPage.addNewSheet');
	newDialog.append();
  },

  addNewMedia: function() {
	var newUrl = this.get('newMediaUrl');
	if (this._tryAddNewMedia(newUrl)) {
	  this._closeNewMediaDialog();
	}
  },

  cancelNewMedia: function() {
	this._closeNewMediaDialog();
  },

  _closeNewMediaDialog: function() {
	var newDialog = TagNav.getPath('adminMediaPage.addNewSheet');
	newDialog.remove();	
  },

  deleteMedia: function() {
	var media = this.get('content');
	TagNav.adminMediaArrayController.selectObject(null);
	media.destroy();
	media.commitRecord();
  },

  YOUTUBE_URL: "youtube.com/watch?v",
  PICASA_URL: "picasaweb.google.com/",

  _tryAddNewMedia: function(mediaUrl) {
	var i, type, id, media;
	
	console.log("before tes youtube");
	if (-1 < (i = mediaUrl.indexOf(this.YOUTUBE_URL))) {
		console.log("it is youtube");
		type = "youtube";
		id = mediaUrl.substr(i+this.YOUTUBE_URL.length+1, 11);
	}
	else if (-1 < (i = mediaUrl.indexOf(this.PICASA_URL))) {
		type = "picasa";
		id = mediaUrl.substr(i+this.PICASA_URL.length);
		
		// TODO: clean any & or ? # from the end of the id
	}
	console.log("after testing");
	if (type !== undefined && id !== undefined) {
		media = TagNav.store.createRecord(TagNav.Media,
			{ 
				"_id": id,
				"type": type,
				"tags": []
			}
		);
		media.commitRecord();
		
		// Select the new media in the admin media grid.
		TagNav.adminMediaArrayController.selectObject(media);
	}
	
	return (media !== undefined);
  },

  _contentDidChanged: function() {
	this.set('hasMediaToEdit', NO);

	var media = this.get('content');
	if (!media || !media.isRecord) {
		this.set('editableTags', null);
	} else {
		this.set('editableTags', media.get('tags').toString());
		this.set('hasMediaToEdit', YES);
	}
  }.observes('*content'),

  _editableTagsDidChanged: function() {
	var hasMediaToEdit = this.get('hasMediaToEdit');
	var media = this.get('content');
	
	if (media) {
		var currTags = media.get('tags').toString();
		var editableTags = this.get('editableTags');
		var hasChanged = (currTags != editableTags);
		
		this.setIfChanged('isAbleToSave', hasChanged);
	}
  }.observes('editableTags')

}) ;
