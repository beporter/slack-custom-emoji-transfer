// ==UserScript==
// @name           Slack Custom Emoji Transfer
// @description    Allows you to download the complete set of custom emoji from your Slack team.
// @author         Brian Porter <beporter@users.spourceforge.net> (http://github.com/beporter)
// @namespace      http://github.com/beporter/slack-custom-emoji-transfer
// @version        0.0.1
// @icon           http://tampermonkey.net/favicon.ico
// @match          https://*.slack.com/admin/emoji*
// @match          https://*.slack.com/customize/emoji*
// @grant          none
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require        https://stuk.github.io/jszip-utils/dist/jszip-utils.js
// ==/UserScript==

/* jshint asi: true, esnext: true, -W097 */

(function($) {
  'use strict'

	var emojiRows = $('tr.emoji_row');
	var images = {};
	var aliases = {};

	emojiRows.each(function (key, item) {
        var name = $('td[headers=custom_emoji_name]', item)[0].innerText;
        var text = $('td[headers=custom_emoji_type]', item)[0].innerText;
        var nameClean = name.match(/:([\w-]+):/)[1].trim();

        if (text.match(/alias/i)) {
            var textClean = text.match(/:([\w-]+):/)[1].trim();
            aliases[textClean] = nameClean;
        } else {
            images[nameClean] = $('td[headers=custom_emoji_image] span').data('original');
        }
	});


    aliases.forEach(function (item) {
        // write to a "text file"
    });
    // add the text file to a zip

    images.forEach(function (item) {
        // add to a zip
    });

console.log({
    aliases,
    images
});

  // Code...

// x Write as a Greasemonkey/Tampermonkey JS script that runs in-browser (at least for download.)
//
// x Import jQuery into the script for keeping things concise.
//
// x Import jszip library.
//
// x Store every DOM node matching `tr.emoji_row` into an array.
//
// x Create two storage objects: `images` and `aliases`.
//
// x Iterate over the list:
//
// x Examine `td.custom_emoji_type.text()` and if it matches `/^Alias for /`:
//   * Use the final `:word:` from `td.custom_emoji_type.text()` (the alias target) as the key.
//   * Use `td.custom_emoji_name.text()` (the "name" of the alias) as the value.
//   * Store the pair in `aliases`.
// x Else:
//   * Store `td.custom_emoji_name.text()` (the "name" the custom emoji) as the key.
//   * Extract `data-original` (the image source URL) as the value.
//   * Store the pair in `images`.
//
// Iterate over the `images` object:
//
// * Grab the file extension from the image URL.
// * Craft a target filename using the emoji name (object key) plus the file extension.
// * Trigger a file download of the given image URL (object value), saving to the target filename.
//
// Open a new browser window(?)
//
// Iterate over the `aliases` object:
//
// * Write the key and value to the window (as plain text) in a format such as `$key,$value\n`.
//
// Trigger a download(?) of the text file window, saving as `aliases.txt`.




}).bind(this)(jQuery)

jQuery.noConflict()
