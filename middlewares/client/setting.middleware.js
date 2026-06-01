const SettingWebsiteInfo = require("../../models/setting-website-info.model");

module.exports.settingInfo = async (req, res, next) => {
  const settingInfo = await SettingWebsiteInfo.findOne();
  res.locals.settingInfo = settingInfo;
  next();
}