const Category = require("../../models/categories.model");
const CategoryTree = require("../../helpers/category-tree.helper")
const City = require('../../models/cities.model');
const Tour = require("../../models/tour.model");
module.exports.list = (req, res) => {
    res.render('admin/pages/tour-list', {
        pageTitle: 'Quản lý tour'
    });
}
module.exports.create = async (req, res) => {
    const listCategory = await Category.find({
        deleted: false,
    })

    const buildCategoryTree = CategoryTree.CategoryTree(listCategory, "")
    const cityList = await City.find({})

    res.render('admin/pages/create-tour', {
        pageTitle: 'Tạo tour mới',
        categoryList: buildCategoryTree,
        cityList: cityList
    });
}
module.exports.createPost = async (req, res) => {
    if(req.body.position) {
    req.body.position = parseInt(req.body.position);
    } else {
        const totalRecord = await Tour.countDocuments({});
        req.body.position = totalRecord + 1;
    }

    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;
    req.body.avatar = req.file ? req.file.path : "";
    req.body.priceAdult = req.body.priceAdult ? parseInt(req.body.priceAdult) : 0;
    req.body.priceChildren = req.body.priceChildren ? parseInt(req.body.priceChildren) : 0;
    req.body.priceBaby = req.body.priceBaby ? parseInt(req.body.priceBaby) : 0;
    req.body.priceNewAdult = req.body.priceNewAdult ? parseInt(req.body.priceNewAdult) : 0;
    req.body.priceNewChildren = req.body.priceNewChildren ? parseInt(req.body.priceNewChildren) : 0;
    req.body.priceNewBaby = req.body.priceNewBaby ? parseInt(req.body.priceNewBaby) : 0;
    req.body.stockAdult = req.body.stockAdult ? parseInt(req.body.stockAdult) : 0;
    req.body.stockChildren = req.body.stockChildren ? parseInt(req.body.stockChildren) : 0;
    req.body.stockBaby = req.body.stockBaby ? parseInt(req.body.stockBaby) : 0;
    req.body.locations = req.body.locations ? JSON.parse(req.body.locations) : [];
    req.body.departureDate = req.body.departureDate ? new Date(req.body.departureDate) : null;
    req.body.schedules = req.body.schedules ? JSON.parse(req.body.schedules) : [];

    const newRecord = new Tour(req.body);
    await newRecord.save();

    res.json({
        code: "success",
        message: "Tạo tour thành công"
    })
}   
module.exports.trash = (req, res) => {
    res.render('admin/pages/Tour-trash', {
        pageTitle: 'Thùng rác tour'
    });
}