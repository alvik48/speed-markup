'use strict';

/* ==============================================
    Import
============================================== */

var Sample = require('./../models/sample.model');

/* ==============================================
    Collection
============================================== */

module.exports = Backbone.Collection.extend({
    model: Sample
});