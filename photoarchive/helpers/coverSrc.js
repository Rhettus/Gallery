/*
  Returns a relative small thumbnail URL for the album cover.
  Scans the previews array for a file named "cover.*" (any extension).
  Falls back to the first preview (same as previews.0.urls.small) if none found.

  Automatically applies the correct relative path prefix using album.depth
  from the template root context (available in options.data.root), so no
  subexpression is needed — just use it directly:

    <img src="{{coverSrc previews}}">

  The Handlebars options hash is always passed as the final argument automatically.
*/
module.exports = function (previews, options) {
  if (!Array.isArray(previews) || previews.length === 0) return ''

  const cover = previews.find(function (p) {
    return p.filename &&
      p.filename.replace(/\.[^.]+$/, '').toLowerCase() === 'cover'
  })

  const rawUrl = cover ? cover.urls.small : previews[0].urls.small

  // Replicate thumbsup's built-in `relative` helper:
  // prefix the URL with '../' repeated for each level of album depth.
  var depth = 0
  if (options && options.data && options.data.root &&
      options.data.root.album) {
    depth = options.data.root.album.depth || 0
  }
  var prefix = ''
  for (var i = 0; i < depth; i++) prefix += '../'
  return prefix + rawUrl
}

