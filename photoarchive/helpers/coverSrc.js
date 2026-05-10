/*
  Returns a relative small thumbnail URL for the album cover.
  Looks for a file named "cover.*" in the full album files list first,
  then falls back to scanning previews, then previews[0].

  Usage: {{coverSrc previews}}
*/
module.exports = function (previews, options) {
  var root = options && options.data && options.data.root
  var albumFiles = (root && root.album && root.album.files) || []
  var depth = (root && root.album && root.album.depth) || 0

  function isCoverFile (f) {
    return f && f.filename &&
      f.filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
  }

  function makeRelative (url) {
    var prefix = ''
    for (var i = 0; i < depth; i++) prefix += '../'
    return prefix + url
  }

  // 1. Check full files list (cover.jpg may not be in the previews subset)
  var coverInFiles = albumFiles.find(isCoverFile)
  if (coverInFiles && coverInFiles.urls && coverInFiles.urls.small) {
    return makeRelative(coverInFiles.urls.small)
  }

  // 2. Check previews subset
  if (Array.isArray(previews)) {
    var coverInPreviews = previews.find(isCoverFile)
    if (coverInPreviews && coverInPreviews.urls && coverInPreviews.urls.small) {
      return makeRelative(coverInPreviews.urls.small)
    }

    // 3. Fall back to first preview
    if (previews.length > 0 && previews[0].urls && previews[0].urls.small) {
      return makeRelative(previews[0].urls.small)
    }
  }

  return ''
}
