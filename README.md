# slack-custom-emoji-transfer
Allows for backup (and maybe eventually re-upload/sync) of a team's custom Slack emoji.


## Plan for Download/Backup

Write as a Greasemonkey/Tampermonkey JS script that runs in-browser (at least for download.)

Import jQuery into the script for keeping things concise.

Store every DOM node matching `tr.emoji_row` into an array.

Create two storage objects: `images` and `aliases`.

Iterate over the list:

* Examine `td.custom_emoji_type.text()` and if it matches `/^Alias for /`:
  * Use the final `:word:` from `td.custom_emoji_type.text()` (the alias target) as the key.
  * Use `td.custom_emoji_name.text()` (the "name" of the alias) as the value.
  * Store the pair in `aliases`.
* Else:
  * Store `td.custom_emoji_name.text()` (the "name" the custom emoji) as the key.
  * Extract `data-original` (the image source URL) as the value.
  * Store the pair in `images`.

Iterate over the `images` object:

* Grab the file extension from the image URL.
* Craft a target filename using the emoji name (object key) plus the file extension.
* Trigger a file download of the given image URL (object value), saving to the target filename.

Open a new browser window(?)

Iterate over the `aliases` object:

* Write the key and value to the window (as plain text) in a format such as `$key,$value\n`.

Trigger a download(?) of the text file window, saving as `aliases.txt`.


## Plan for Upload/Restore

TODO
