'use strict';

var _ = require('../../bower_components/underscore/underscore');
var $ = require('../../bower_components/jquery/dist/jquery');
var Backbone = require('../../bower_components/backbone/backbone');
Backbone.$ = $;

/* ==============================================
    Model
============================================== */

module.exports = Backbone.Model.extend({
    defaults: {
        title: '',
        link: ''
    }
});