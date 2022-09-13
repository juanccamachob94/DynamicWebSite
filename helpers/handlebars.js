module.exports = {
  module_slug: (v) => require('slug')(v.replace(/\//g, '-')),
  limit: (array, limit) => {
    if (!Array.isArray(array))
      return [];
    return array.slice(0, limit);
  }
}
