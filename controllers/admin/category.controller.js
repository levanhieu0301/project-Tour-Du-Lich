const Category = require("../../models/categories.model");
const CategoryTree = require("../../helpers/category-tree.helper")
const AccountAdmin = require("../../models/account-admin.model")
const moment = require('moment');
const slugify = require('slugify');
module.exports.list = async (req, res) => {
    const find = {
        deleted: false,
        // Lọc theo ngày tạo(ý tưởng)
        // createdAt:{
        //     $gte: "09-09-1022", // ngày bắt đầu
        //     $lte: "09-09-2023" // ngày kết thúc
        // }
    }
    if(req.query.status){
        find.status = req.query.status
    }
    if(req.query.createdBy){
        find.createdBy = req.query.createdBy
    }
    // Lọc theo ngày tạo
    const dateFilter = {};
    if(req.query.startDate) {
        const startDate = moment(req.query.startDate).startOf("day").toDate();
        dateFilter.$gte = startDate;
    }
    if(req.query.endDate) {
        const endDate = moment(req.query.endDate).startOf("day").toDate();
        dateFilter.$lte = endDate;
    }
    if(Object.keys(dateFilter).length > 0) {
        find.createdAt = dateFilter;
    }
    // Hết Lọc theo Ngày tạo

     // Tìm kiếm
    if(req.query.keyword) {
    const keyword = slugify(req.query.keyword, {
      lower: true
    });
    const keywordRegex = new RegExp(keyword);
    find.slug = keywordRegex;
     }
    // Hết Tìm kiếm
    // Phân trang
    let limitItem = 4;
    let page = 1
    if(req.query.page){
        const pageCurrent = parseInt(req.query.page)
        if(pageCurrent > 0){
            page = pageCurrent
        }
    }
    const totalRecord = await Category.countDocuments({})
    const totalPage = Math.ceil(totalRecord / limitItem)
    const skip = (page - 1) * limitItem
    const pagination = {
        totalRecord: totalRecord,
        totalPage: totalPage,
        skip: skip,
    }

    //Hết phân trang

    const listCategory = await Category
    .find(find)
    .limit(limitItem)
    .skip(skip)
    .sort({
        position:"desc"
    })
    for(const item of listCategory){
        if(item.createdBy){
            const infoAccount = await AccountAdmin.findOne({
                _id: item.createdBy
            })
            item.createdByFullName = infoAccount.fullName
        }
        if(item.updatedBy){
            const infoAccount = await AccountAdmin.findOne({
                _id: item.updatedBy
            })
           item.updatedByFullName = infoAccount.fullName
        }
        item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
        item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY")
    }
    // Danh sách tài khoản admin
    const listAccountAdmin = await AccountAdmin
    .find({
        status: "active",
    })
    .select("id fullName")

    // HếtDanh sách tài khoản admin
   
    res.render('admin/pages/category-list', {
        pageTitle: 'Quản lý danh mục',
        listCategory: listCategory,
        listAccountAdmin: listAccountAdmin,
        pagination: pagination,
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

    req.flash('success', 'Tạo danh mục thành công!');
    res.json({
        code: "success",
        //message: "Tạo danh mục thành công"
    })
}
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
    const categoryInfo = await Category.findOne({
        _id: id,
        deleted: false,
    })
    if(!categoryInfo){
        req.flash('error', 'Danh mục không tồn tại!');
        return res.redirect(`/${pathAdmin}/category/list`)
    }
    const listCategory = await Category.find({
        deleted: false,
    })

    const buildCategoryTree = CategoryTree.CategoryTree(listCategory, "")

    res.render('admin/pages/category-edit', {
        pageTitle: 'Chỉnh sửa danh mục',
        categoryInfo: categoryInfo,
        listCategory: buildCategoryTree
    });
    } catch (error) {
        res.redirect(`/${pathAdmin}/category/list`)
    }
}       
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryInfo = await Category.findOne({
            _id: id,
            deleted: false,
        })
        if(!categoryInfo){
            res.json({
                code: "error",
                message: "Danh mục không tồn tại!"
            })
            return;
        }
        if(req.body.position){
            req.body.position = parseInt(req.body.position)
        }else {
            const totalRecord = await Category.countDocuments({})
            req.body.position = totalRecord + 1;
        }
        req.body.updatedBy = req.account.id

        req.body.avatar = req.file? req.file.path : delete req.body.avatar

        await Category.updateOne({
            _id: id,
            deleted: false,
        }, req.body)

       req.flash('success', 'Cập nhật danh mục thành công!');

        res.json({
        code: "success",
        });

    } catch (error) {
        res.json({
            code: "error",
            message: "Có lỗi xảy ra, vui lòng thử lại!"
        })
    }
}   
module.exports.deletePatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Category.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: Date.now(),
      deletedBy: req.account.id
    });

    req.flash('success', 'Xóa danh mục thành công!');

    res.json({
      code: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không tồn tại trong hệ thống!"
    })
  }
}
module.exports.changeMultiPatch = async (req, res) => {
  try {
    const { option, ids } = req.body;

    switch (option) {
      case "active":
      case "inactive":
        await Category.updateMany({
          _id: { $in: ids }
        }, {
          status: option
        });
        req.flash("success", "Đổi trạng thái thành công!");
        break;
      case "delete":
        await Category.updateMany({
          _id: { $in: ids }
        }, {
          deleted: true,
          deletedAt: Date.now(),
          deletedBy: req.account.id
        });
        req.flash("success", "Xóa thành công!");
        break;
    }

    res.json({
      code: "success"
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Cập nhật không thành công!"
    });
  }
}
