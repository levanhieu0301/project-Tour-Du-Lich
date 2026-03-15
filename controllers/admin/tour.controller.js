module.exports.list = (req, res) => {
    res.render('admin/pages/tour-list', {
        pageTitle: 'Quản lý tour'
    });
}
module.exports.create = (req, res) => {
    res.render('admin/pages/create-tour', {
        pageTitle: 'Tạo tour mới'
    });
}
module.exports.trash = (req, res) => {
    res.render('admin/pages/Tour-trash', {
        pageTitle: 'Thùng rác tour'
    });
}