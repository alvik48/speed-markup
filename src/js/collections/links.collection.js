'use strict';

var _ = require('../../bower_components/underscore/underscore');
var $ = require('../../bower_components/jquery/dist/jquery');
var Backbone = require('../../bower_components/backbone/backbone');
Backbone.$ = $;

/* ==============================================
    Import
============================================== */

var Link = require('./../models/link.model');

/* ==============================================
    Collection
============================================== */

module.exports = Backbone.Collection.extend({
    model: Link
});