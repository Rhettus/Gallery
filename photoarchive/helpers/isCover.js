/*
  Block helper that suppresses rendering for files named "cover.*".
  Renders the {{else}} block (the normal thumbnail) for all other files.
  Renders nothing for cover files, hiding them from the gallery grid.

  Usage in thumbnail.hbs:
    {{#isCover filename}}{{else}}
      ... normal thumbnail markup ...
    {{/isCover}}

  The Handlebars options hash is always passed as the final argument automatically.
*/
module.exports = function (filename, options) {
  if (!filename) return options.inverse(this)
  var isCover = filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
  return isCover ? options.fn(this) : options.inverse(this)
}
