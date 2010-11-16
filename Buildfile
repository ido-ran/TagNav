# ===========================================================================
# Project:   TagNav
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# url_prefix is used to add CouchDB previx to the script include blocks.
# load_fixtures is used to test the application in production using the fixtures.
config :all, :required => :sproutcore, :url_prefix => "/tagnav/_design/tagnav/", :load_fixtures => true