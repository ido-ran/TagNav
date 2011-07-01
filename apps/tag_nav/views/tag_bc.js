// ==========================================================================
// Project:   TagNav.TagBc
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
TagNav.TagBc = SC.View.extend(SC.Control,
/** @scope TagNav.TagBc.prototype */ {

  tagName: 'div',
  classNames: ['tagbc-view'],
//  contentDisplayProperties: ['tags'],

  tags: [],
  tagsToAdd: {},

  _tags: null,

  _tagCloudPopup: null,
  _tagCloudView: null,

  init: function() {
	sc_super();
	
	this._tagnav_tagbd_tagsDidReplace();
	this._tagnav_tagbd_tagsToAddDidReplace();
	
	this._tagCloudView = 
	  TagNav.PopupTagCloud.design({
	    layout: { width: 580 },
	    backgroundColor: 'black',
	    tagsBinding: 'TagNav.navigatorController.tagsInFilter'
	  });
	this._tagCloudPopup = SC.PickerPane.create({
		layout: { width: 600, height: 400 },
		contentView: this._tagCloudView
	});
  },

  /**
  called when the entier tags collection reassign.
  */
  _tagnav_tagbd_tagsDidReplace: function() {
	var currTags = this._tags;
	if (currTags) currTags.removeObserver('[]', this, this._tagnav_tagbc_tagsDidChange);

	var tags = this.get('tags');
	tags.addObserver('[]', this, this._tagnav_tagbc_tagsDidChange);
	
	this.updateLayer();
  }.observes('tags'),

  /**
  called when the content of the tags property has changed.
  */
  _tagnav_tagbc_tagsDidChange: function() {
    this.updateLayer();
  },

  /**
  called when the entier tagsToAdd collection reassign.
  */
  _tagnav_tagbd_tagsToAddDidReplace: function() {
//	var currTags = this._tagsToAdd;
//	if (currTags) currTags.removeObserver('[]', this, this._tagnav_tagbd_tagsToAddDidChange);

//	var tagsToAdd = this.get('tagsToAdd');
//	tagsToAdd.addObserver('[]', this, this._tagnav_tagbc_tagsToAddDidChange);
	
	this.updateTagsToAdd();
  }.observes('tags'),

  /**
  called when the content of the tagsToAdd property has changed.
  */
  _tagnav_tagbc_tagsToAddDidChange: function() {
    this.updateTagsToAdd();
  },

  updateTagsToAdd: function() {
	var addTag = this.$('#addtag');

    // TODO: add tagsToAdd to the select field.
  },

  render: function(context, firstTime) {
	var c = context;
	var tags = this.get('tags');
	
//	if (firstTime) {
		c.push('<div id="tagscope">');
		c.push('  <ul id="tagscopenav">');
		c.push('    <li class="scope">');
		c.push('      <a class="currscope" id="currscope">תוויות</a>');
		c.push('    </li>');
//		c.push('	<li class="tags">');
//		c.push('       <ul>');
		tags.forEach(function(tag, idx) {
		  var liClass = idx == 0 ? 'tag first' : 'tag';
		  c.push('<li class="%@"><a class="onlytag">%@</a>'.fmt(liClass, tag));
	      c.push('  <a class="removetag"><span>[x]</span></a></li>');
		});
//		c.push('<li class="tag first"><a class="onlytag" href="/tag/blogs">blogs</a>');
//        c.push('  <a class="removetag" href="?removetag=blogs"><span>[x]</span></a></li>');
//		c.push('       </ul
		c.push('    </li>');
//		c.push('    <li class="addscope">');
//		c.push('      <a class="currscope" id="addtagSubmit">דפדף</a>');
//		c.push('    </li>');
		c.push('  </ul>');
		c.push('</div>');
//	}

    return sc_super();
  },

  didCreateLayer: function() {
	var input = this.$('addtag');
    SC.Event.add(input, 'focus', this, this._input_DidKeyDown);
	SC.Event.add(input, 'onchange', this, this._input_DidChange);
//    sc_super();
  },

  willDestroyLayer: function() {
	var input = this.$('addtag');
	SC.Event.remove(input, 'keydown',  this, this._input_DidKeyDown);
	SC.Event.remove(input, 'onchange', this, this._input_DidChange);
//    sc_super();
  },

  _input_DidKeyDown: function(evt) {
  },

  _input_DidChange: function(evt) {
	return YES;
  },

  mouseDown: function(evt) {
	var elem = evt.target;

	var onlyTagQry = this.$('.onlytag');
	var remTagQry = this.$('.removetag');

	for (var i in remTagQry) {
		var remTagElem = remTagQry[i];
		if (elem == remTagElem) {
			var onlyTagElem = SC.$(onlyTagQry[i]).first();
			var tags = this.get('tags');
			tags.removeObject(onlyTagElem.text());
        }
	}
	
	if (this.$('#addtagSubmit').within(elem)) {
		// The add tag button was clicked
		var l = this.get('layer');
		if (l == null) return;
		var height = l.offsetHeight;
		var width = l.offsetWidth;
		var top = l.offsetTop;
		
		wsize = SC.RootResponder.responder.computeWindowSize();
		
		this._tagCloudPopup.set('layout', { width: width * 0.7, height: wsize.height * 0.8 - top });
		this._tagCloudPopup.contentView.set('layout', { width: width * 0.7 });
		this._tagCloudPopup.popup(this, SC.PICKER_POINTER, [3,3,3,3,3]);
	}
	
	if (this.$('#currscope').within(elem)) {
		// The root Tags was clicked
		var tags = this.get('tags');
		while (tags.length > 0) tags.popObject();
	}

	return YES;
  },
/*
<div id="tagscope">
  <ul id="tagscopenav">
    <li class="scope">
                        <a href="/tag" class="currscope" id="currscope">Tags</a>
                </li>

	<li class="tags">
                <ul>
                   <li class="tag first"><a class="onlytag" href="/tag/blogs">blogs</a>
                     <a class="removetag" href="?removetag=blogs"><span>[x]</span></a></li>
                   <li class="tag"><a class="onlytag" href="/tag/programming">programming</a>
                     <a class="removetag" href="?removetag=programming"><span>[x]</span></a></li>
                   <li class="tag"><a class="onlytag" href="/tag/android">android</a>
                     <a class="removetag" href="?removetag=android"><span>[x]</span></a></li>
                </ul>
            </li>
        <li class="box">
        <form id="magicboxform" name="magicboxform" action="/tag/blogs+programming+android">
            <input type="hidden" name="tagtype" id="addtagType" value="tag">
            <input type="text" size="25" name="addtag" id="addtag" autocomplete="off" value="Type another tag">
            <input type="submit" name="addtagSubmit" value="" id="addtagSubmit">
        </form>
    </li>
  </ul>
</div>
*/
});
