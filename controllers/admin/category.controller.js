const Category = require("../../models/categories.model");
const CategoryTree = require("../../helpers/category-tree.helper")

module.exports.list = (req, res) => {
    res.render('admin/pages/category-list', {
        pageTitle: 'Quản lý danh mục'
    });
}
module.exports.create = async (req, res) => {
    const listCategory = await Category.find({
        deleted: false,
    })

    const buildCategoryTree = CategoryTree.CategoryTree(listCategory, "")

    res.render('admin/pages/category-create', {
        pageTitle: 'Tạo danh mục',
        listCategory: buildCategoryTree
    });
}
module.exports.createPost = async (req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }else {
        const totalRecord = await Category.countDocuments({})
        req.body.position = totalRecord + 1;
    }
    req.body.createdBy = req.account.id
    req.body.updatedBy = req.account.id

    req.body.avatar = req.file? req.file.path : ""

    const newRecord = new Category(req.body)
    await newRecord.save();
    res.json({
        code: "success",
        message: "Tạo danh mục thành công"
    })
}