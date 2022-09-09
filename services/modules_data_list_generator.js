const JsonUrlReader = require('../services/json_url_reader');

module.exports = {
  perform: async(webSiteUrl) => {
    if(webSiteUrl == undefined)
      return [];
    try {
      let webSiteData = await JsonUrlReader.perform(webSiteUrl);
      return (
        await Promise.all(
          webSiteData.modules.map(async (module) => {
          try {
            return {
              modulePath: () => module.modulePath,
              data: {
                content: (await JsonUrlReader.perform(module.baseDataUrl)),
                structure: {
                  more: module.more,
                  title: module.title
                }
              }
            }
          } catch (e) {
            return {}
          }
        })
      )
    ).filter(module => Object.entries(module).lenght != 0);
    } catch(e) {
      return [];
    }
  }
}
