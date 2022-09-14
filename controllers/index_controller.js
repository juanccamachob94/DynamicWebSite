const ModulesDataListGenerator = require('../services/modules_data_list_generator');

module.exports = {
  index: async(req, res) => {
    res.render('index', {
      modulesDataList: (
        await ModulesDataListGenerator.perform(req.query.url || process.env.MAIN_WEBSITE_URL)
      )
    });
  }
}
