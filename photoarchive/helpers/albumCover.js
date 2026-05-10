'use strict'

/*
  Returns the small URL for whichever file is named "cover" (any extension),
  falling back to the first preview if none is found.

  Usage in templates:
    {{albumCover files previews}}
*/
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('albumCover', function (files, previews) {
    const cover = Array.isArray(files) && files.find(function (f) {
      return f.filename &&
        f.filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
    })
    if (cover) return cover.urls.small
    return previews && previews[0] && previews[0].urls.small
  })

  /*
    Returns true if the filename (without extension) is "cover".
    Used in thumbnail.hbs to suppress the cover image from the gallery grid.

    Usage in templates:
      {{isCover filename}}
  */
  Handlebars.registerHelper('isCover', function (filename) {
    if (!filename) return false
    return filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
  })
}
