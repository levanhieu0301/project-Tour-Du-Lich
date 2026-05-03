const SettingWebsiteInfo = require("../../models/setting-website-info.model");
const Role = require("../../models/role.model")
const permissions = require("../../config/client/permission");
const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require('bcryptjs');

module.exports.list = (req, res) => {
    res.render('admin/pages/setting-list', {
        pageTitle: 'Cài đặt chung'
    });
}
module.exports.createAccountAdmin = async (req, res) => {
    const roleDetail = await Role.find({
      deleted: false
    });
    res.render('admin/pages/setting-account-admin-create', {
        pageTitle: 'Tạo tài khoản quản trị',
        roleList: roleDetail
    });
}
module.exports.listAccountAdmin = async (req, res) => {
    const accountAdminList = await AccountAdmin
    .find({
      deleted: false
    }).sort({
      createdAt: "desc"
    });

  for(const item of accountAdminList) {
    if(item.role) {
      const roleInfo = await Role.findOne({
        _id: item.role
      });

      if(roleInfo) {
        item.roleName = roleInfo.name;
      }
    }
  }

    res.render('admin/pages/setting-account-admin-list', {
        pageTitle: 'Tài khoản quản trị',
        accountAdminList: accountAdminList
    });
}
module.exports.createRole = (req, res) => {
    res.render('admin/pages/setting-role-create', {
        pageTitle: 'Tạo nhóm quyền',
        permissionList: permissions.permissionList
    });
}
module.exports.listRole = async (req, res) => {
    const roleList = await Role.find({
        deleted: false
    });

    res.render('admin/pages/setting-role-list', {
        pageTitle: 'Nhóm quyền',
        roleList: roleList
    });
}
module.exports.websiteInfo = async (req, res) => {
    const websiteInfo = await SettingWebsiteInfo.findOne({});

    res.render('admin/pages/setting-website-info', {
        pageTitle: 'Thông tin website',
        websiteInfo: websiteInfo
    });
}
module.exports.WebsiteInfoPatch = async(req, res) => {

    if(Object.keys(req.files).length > 0){
        if(req.files.logo){
            req.body.logo = req.files.logo[0].path
        }else {
            delete req.body.logo;
        }
        if(req.files.favicon){
            req.body.favicon = req.files.favicon[0].path
        }else {
            delete req.body.favicon;
        }
    }else {
        delete req.body.logo;
        delete req.body.favicon;
    }
    const existingRecord = await SettingWebsiteInfo.findOne({});
    if(!existingRecord){
        const newRecord = new SettingWebsiteInfo(req.body);
        await newRecord.save()
    }else {
        await SettingWebsiteInfo.updateOne(
            {
            _id: existingRecord.id
            },
             req.body
    );
    }
    res.json({ 
        code: "success",
        message: 'Thông tin website đã được cập nhật thành công'
    });
}
module.exports.createRolePost = async (req, res) => {

    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;

    const newRecord = new Role(req.body);
    await newRecord.save();


    res.json({      
        code: "success",
        message: 'Tạo nhóm quyền thành công'
    }); 

}
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const roleDetail = await Role.findOne({
      _id: id,
      deleted: false
    });

    res.render("admin/pages/setting-role-edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      permissionList: permissions.permissionList,
      roleDetail: roleDetail
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/setting/list-role`);
  }
}

module.exports.roleEditPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: 'success',
      message: 'Cập nhật nhóm quyền thành công'
    })
  } catch (error) {
    res.redirect(`/${pathAdmin}/setting/list-role`);
  }
}
module.exports.accountAdminCreatePost = async (req, res) => {
  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;
  req.body.logo = req.file ? req.file.path : "";

  const existAccount = await AccountAdmin.findOne({
    email: req.body.email
  });

  if(existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    });
    return;
  }

  // Mã hóa mật khẩu với bcrypt
  const salt = await bcrypt.genSalt(10); // Tạo salt - Chuỗi ngẫu nhiên có 10 ký tự
  req.body.password = await bcrypt.hash(req.body.password, salt); // Mã hóa mật khẩu

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();


  res.json({
    code: "success",
    message: "Tạo tài khoản quản trị thành công!"
  });
}
