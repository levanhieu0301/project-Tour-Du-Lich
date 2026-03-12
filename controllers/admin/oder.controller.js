module.exports.list = (req, res) => {
    res.render('admin/pages/oder-list', {
        pageTitle: 'Quản lý đơn hàng'
    });
}
module.exports.edit = (req, res) => {
    res.render('admin/pages/oder-edit', {
        pageTitle: 'Chỉnh sửa đơn hàng'
    });
}