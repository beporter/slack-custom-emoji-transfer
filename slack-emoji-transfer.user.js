// ==UserScript==
// @name           Slack Custom Emoji Transfer
// @description    Allows you to download the complete set of custom emoji from your Slack team.
// @author         Brian Porter <beporter@users.spourceforge.net> (http://github.com/beporter)
// @namespace      http://github.com/beporter/slack-custom-emoji-transfer
// @version        0.0.1
// @icon           http://tampermonkey.net/favicon.ico
// @match          https://*.slack.com/customize/emoji*
// @match          https://*.slack.com/admin/emoji*
// @connect        https://*.slack-edge.com
// @grant          none
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require        https://stuk.github.io/jszip/dist/jszip.js
// ==/UserScript==

/* jshint asi: true, esnext: true, -W097 */

(function($) {
    'use strict'

	var images = Object.create(null);
	var aliases = Object.create(null);
    var zip = new JSZip();

	// Collect emoji names and URLs/aliases.
    $('tr.emoji_row').each(function (key, item) {
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

    // Create a text file of alias mappings in the zip.
    zip.file("aliases.txt",
        Object.keys(aliases).map(function (key) {
            return key + "," + aliases[key];
        }).join("\n")
    );

console.log({
    aliases,
    images
});

    // Fetch the binary data for each image and add it into the zip keyed by the emoji name.
    Object.keys(aliases).map(function (name) {
        var url = images[name];
        var ext = url.slice((url.lastIndexOf(".") - 1 >>> 0) + 2);
        var filename = name + '.' + ext;
        var content = fetch(url);

        fetch(url, {
            mode: 'no-cors' //@WORKING: `no-cors` only works in Chrome Canary!!!
        })
            .then(function(response) {
                return response.blob();
            })
            .then(function(myBlob) {
                zip.file(filename, myBlob, {base64: true});
            })
            .catch(function(error) {
                console.log(error);
            });
    });

return;

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, $('#header_team_name').text() + ".zip");
        });

}).bind(this)(jQuery)

jQuery.noConflict()
