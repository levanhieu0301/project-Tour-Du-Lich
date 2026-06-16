const AccountAdmin = require("../../models/account-admin.model")
const Role = require('../../models/role.model');
module.exports.edit = async (req, res) => {
   const profileAcc = await AccountAdmin.findOne({
    _id: req.account.id
   }) 
   if(profileAcc){
    const profileRole = await Role.findOne({
        _id: profileAcc.role
    })
    profileAcc.roleName = profileRole.name
   }
    res.render('admin/pages/profile-edit', {
        pageTitle: 'Thông tin cá nhân',
        profileAcc: profileAcc,
    });
}
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.account.id;

    req.body.updatedBy = req.account.id;
    if(req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    await AccountAdmin.updateOne({
      _id: id,
      deleted: false
    }, req.body);


    res.json({
      code: "success",
        message: "Cập nhật thông tin cá nhân thành công"
    });
  } catch (error) {
    res.json({
      code: "error",
      message: error
    });
  }
}