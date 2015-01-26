'use strict';

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