const SettingWebsiteInfo = require("../../models/setting-website-info.model");

module.exports.list = (req, res) => {
    res.render('admin/pages/setting-list', {
        pageTitle: 'Cài đặt chung'
    });
}
module.exports.createAccountAdmin = (req, res) => {
    res.render('admin/pages/setting-account-admin-create', {
        pageTitle: 'Tạo tài khoản quản trị'
    });
}
module.exports.listAccountAdmin = (req, res) => {
    res.render('admin/pages/setting-account-admin-list', {
        pageTitle: 'Tài khoản quản trị'
    });
}
module.exports.createRole = (req, res) => {
    res.render('admin/pages/setting-role-create', {
        pageTitle: 'Tạo nhóm quyền'
    });
}
module.exports.listRole = (req, res) => {
    res.render('admin/pages/setting-role-list', {
        pageTitle: 'Nhóm quyền'
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