module.exports.error = (req, res) => {
    res.render('admin/pages/Error', {
        pageTitle: '404 Not Found'
    });
}