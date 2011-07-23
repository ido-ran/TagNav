// ==========================================================================
// Project:   TagNav.adminMediaController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TagNav.adminMediaController = SC.ArrayController.create(
/** @scope TagNav.adminMediaController.prototype */ {

  /* 
  The content of this controller is bound to the selection of adminMediaArrayController
  which can be multiple album selection
  */
  contentBinding: 'TagNav.adminMediaArrayController.selection',

  /* Tag of selected media that is editable by the uesr */
  editableTags: null,

  /* date of the selected media that is editable by the user */
  editableDate: null,

  /* single tag text to be either add or remove from all media */
  singleTag: null,

  /* read-only property contain the tags of the selected media before edit began */
  selectedMediaTags: null,

  /* YES if there is something to save, NO otherwise */
  isAbleToSave: NO,

  hasMediaToEdit: NO,

  /* The URL for the new media */
  newMediaUrl: '',

  orderBy: function(x,y) { return 1; },

  totalSelectedMedia: function() {
	var l = this.get('length');
	if (l === 0) return "אין אלבומים בחורים";
	else if (l === 1) return "אלבום אחד";
	else return l + " אלבומים";
  }.property('length').cacheable(),

  saveMedia: function() {
    var medias = this.get('content');
    var tagsArray = this.get('editableTags').split(',');
	var editableDate = this.get('editableDate');
	var date = null;
	if (editableDate != null) {
		date = SC.DateTime.parse(editableDate, "%Y-%m-%d");
	}
	for (var i=0; i<tagsArray.length; i++) {
		tagsArray[i] = tagsArray[i].trim();
	}
    medias.forEach(function(m) {
		m.set('tags', tagsArray);
		if (date != null) m.set('date', date);
		m.commitRecord();
    });
  },

  removeSingleTag: function() {
	var medias = this.get('content');
    var tag = this.get('singleTag').trim();
    medias.forEach(function(m) {
		var mediaTags = m.get('tags').copy();
		mediaTags.removeObject(tag);
		m.set('tags', mediaTags);
		m.commitRecord();
    });
  },

  addSingleTag: function() {
	var medias = this.get('content');
    var tag = this.get('singleTag').trim();
    medias.forEach(function(m) {
		var mediaTags = m.get('tags').copy();
		mediaTags.pushObject(tag);
		m.set('tags', mediaTags);
		m.commitRecord();
    });
  },

  isSignleTagEditEnabled: function() {
	var singleTag = this.get('singleTag');
	var hasMediaToEdit = this.get('hasMediaToEdit');
	var isEnabled = (singleTag != '' && hasMediaToEdit);
	return isEnabled;
  }.property('singleTag,hasMediaToEdit').cacheable(),

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
	var medias = this.get('content');

	SC.AlertPane.warn(
		"_deleteMediaTitle".loc(), 
		"_deleteMediaMessage".loc(), null,
		"_yes".loc(), "_no".loc(),
		{
		  alertPaneDidDismiss: function(pane, status) {
			if (status === SC.BUTTON1_STATUS) {
		      TagNav.adminMediaArrayController.selectObject(null);
			  medias.forEach(function(m) {
				  m.destroy();
				  m.commitRecord();
			  });
			
			  TagNav.adminMediaArrayController._reload();
		    }
          }
		}
	);
  },

  YOUTUBE_URL: "youtube.com/watch?v",
  PICASA_URL: "picasaweb.google.com/",

  _tryAddNewMedia: function(mediaUrl) {
	var i, type, id, media;
	
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

	if (!SC.none(type) && !SC.none(id)) {
		media = TagNav.store.createRecord(TagNav.Media,
			{ 
				"_id": id,
				"type": type,
				"tags": []
			}
		);
		media.set('date', SC.DateTime.create());
		media.commitRecord();
		
		// Select the new media in the admin media grid.
		TagNav.adminMediaArrayController._reload();
		TagNav.adminMediaArrayController.selectObject(media);
	}
	
	return (media !== undefined);
  },

  _contentDidChanged: function() {
	this.set('hasMediaToEdit', NO);
	this.set('mediaID', null);
	
	var media = this.get('content');
	if (!media) {
		// There is no media at all.
		this.set('editableTags', null);
		this.set('editableDate', null);
	}
	else if (media.get('length') == 1) {
		var mediaRec = media.firstObject();
		this.set('editableTags', mediaRec.get('tags').toString());
		var date = mediaRec.get('date');
		this.set('editableDate', date ? date.toFormattedString('%Y-%d-%m') : null);
		this.set('selectedMediaTags', mediaRec.get('tags').toString());
		this.set('selectedMediaDate', mediaRec.get('date'));
		this.set('mediaID', mediaRec.get('_id'));
		this.set('hasMediaToEdit', YES);
		
	} else {
		// Multiple media selected
		var aggrTags = SC.Set.create();
		media.forEach(function(m) {
			aggrTags.addEach(m.get('tags'));
		});
		
		var aggrTagsArray = aggrTags.toArray();
		this.set('editableTags', aggrTagsArray.toString());
		this.set('editableDate', null);
		this.set('selectedMediaTags', aggrTagsArray.toString());
		this.set('hasMediaToEdit', YES);
	}
  }.observes('length'),

  _editableTagsDidChanged: function() {
	var hasMediaToEdit = this.get('hasMediaToEdit');
	var media = this.get('content');

	if (hasMediaToEdit && media) {
		var currTags = this.get('selectedMediaTags');
		var editableTags = this.get('editableTags');
		var hasTagsChanged = (currTags != editableTags);
		var hasDateChanged = (this.get('selectedMediaDate') != this.get('editableDate'))
		
		this.setIfChanged('isAbleToSave', hasTagsChanged || hasDateChanged);
	}
  }.observes('editableTags', 'editableDate')

}) ;
