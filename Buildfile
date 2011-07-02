# ===========================================================================
# Project:   TagNav
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# url_prefix is used to add CouchDB previx to the script include blocks.
# load_fixtures is used to test the application in production using the fixtures.
config :all, :required => :sproutcore, :layout => 'tag_nav:lib/index.rhtml'

# in the production CouchDB there is a rewrite rule that map /db to the root of tagnav database.
proxy '/db', :to => 'localhost:5984', :url => '/tagnav'

# This simply map the _session to itself during development because SproutCore works on port 4020 and CouchDB works on 5984. In the production env it simply go to server/_session.
proxy '/_session', :to => 'localhost:5984', :url => '/_session'