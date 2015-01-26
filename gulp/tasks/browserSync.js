var browserSync = require('browser-sync');

module.exports = function() {
    browserSync({
        proxy: "http://localhost:3000/"
    });
};