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

