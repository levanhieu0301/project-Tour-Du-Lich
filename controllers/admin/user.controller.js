const bcrypt = require("bcryptjs");
const AccountAdmin = require("../../models/account-admin.model");
const Role = require("../../models/role.model");
module.exports.list = (req, res) => {
    res.render('admin/pages/user-list', {
        pageTitle: 'Quản lý người dùng'
    });
}
module.exports.changePassword = (req, res) => {
    res.render('admin/pages/profile-change-password', {
        pageTitle: 'Đổi mật khẩu'
    });
}
module.exports.edit = (req, res) => {
    res.render('admin/pages/profile-edit', {
        pageTitle: 'Thông tin cá nhân'
    });
}
module.exports.changePasswordPatch = async (req, res) => {
  try {
    const id = req.account.id;

    req.body.updatedBy = req.account.id;

    // Mã hóa mật khẩu với bcrypt
    const salt = await bcrypt.genSalt(10); // Tạo salt - Chuỗi ngẫu nhiên có 10 ký tự
    req.body.password = await bcrypt.hash(req.body.password, salt); // Mã hóa mật khẩu

    await AccountAdmin.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: "success",
        message: "Đổi mật khẩu thành công"
    });
  } catch (error) {
    res.json({
      code: "error",
      message: error
    });
  }
}

