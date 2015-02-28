'use strict';
/**
 * Exporting a Browserify module export for the global version of window.jQuery
 * This is to be used when compiling a bundle with browserify rather than including
 * it in the package.json file due to a conflict with jQuery not setting it to the
 * global scope when compiled through node.
 *
 * @type {jQuery|*|Window.jQuery}
 */
module.exports = window.jQuery;