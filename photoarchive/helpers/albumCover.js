'use strict'

/*
  Block helper that resolves the cover image small URL and yields it as a
  block param. Falls back to previews[0] if no file named "cover.*" is found.

  Usage in templates:
    {{#albumCover files previews as |coverUrl|}}
      <img src="{{relative coverUrl}}">
    {{/albumCover}}
*/
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('albumCover', function (files, previews, options) {
    const cover = Array.isArray(files) && files.find(function (f) {
      return f.filename &&
        f.filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
    })
    const url = cover
      ? cover.urls.small
      : (previews && previews[0] && previews[0].urls.small) || ''

    return options.fn(this, { data: options.data, blockParams: [url] })
  })

  /*
    Block helper — renders {{fn}} block if filename is "cover.*", else {{inverse}}.

    Usage in templates:
      {{#isCover filename}}...hidden...{{else}}...shown...{{/isCover}}
  */
  Handlebars.registerHelper('isCover', function (filename, options) {
    if (!filename) return options.inverse(this)
    const match = filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
    return match ? options.fn(this) : options.inverse(this)
  })
}
