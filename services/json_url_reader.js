
module.exports = {
  /**
   * timestamp parameter is added to define no-cache
   */
  perform: async(url, params = {}) => {
    return (await (require('axios').create({
      baseURL: url,
      params: { ...params, timestamp: Date.now() }
    })).get()).data;
  }
}
