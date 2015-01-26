'use strict';

/* ==============================================
    Import libs
============================================== */

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');

/* ==============================================
    Require views
============================================== */

var TopNavView = require('./views/top-nav.view');

/* ==============================================
    Bootstrap views
============================================== */

(function() {
    var topNavView = new TopNavView();
})();