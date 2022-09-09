module.exports = {
  module_slug: (v) => require('slug')(v.replace(/\//g, '-'))
}
