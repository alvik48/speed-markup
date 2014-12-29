'use strict';

/* ==============================================
    Import
============================================== */

var Sample = require('./../models/sample.model');
var Samples = require('./../collections/samples.collection');

/* ==============================================
    View
============================================== */

module.exports = Backbone.View.extend({
    el: $('.jsSample'),

    initialize: function() {
        this.samples = new Samples([
            {title: 'Sample-1'},
            {title: 'Sample-2'},
            {title: 'Sample-3'}
        ]);
        this.render();
    },

    render: function() {
        var self = this;
        _(this.samples.models).each(function(item){
            self.appendItem(item);
        }, this);
    },

    appendItem: function(item) {
        var li = '<li>' + item.get('title') + '</li>';
        $(this.el).append(li);
    }
});