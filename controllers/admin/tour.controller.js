const Category = require("../../models/categories.model");
const CategoryTree = require("../../helpers/category-tree.helper")
const City = require('../../models/cities.model');
const Tour = require("../../models/tour.model");
const AccountAdmin = require("../../models/account-admin.model");
const moment = require('moment');
const getAllChildIds = require("../../helpers/category-tree.helper");
const slugify = require('slugify');
module.exports.list = async (req, res) => {
    const find = {
        deleted: false,
    }
    // Lọc theo trạng thái
    if(req.query.status) {
        find.status = req.query.status;
    }
    // End lọc theo trạng thái
    // Lọc theo người tạo
    if(req.query.createdBy) {
        find.createdBy = req.query.createdBy;
    }
    // End lọc theo người tạo
    // Lọc theo khoảng thời gian
    const dateFilter = {};
    if(req.query.startDate){
        const startDateFomrat= moment(req.query.startDate).startOf("day").toDate()
        dateFilter.$gte = startDateFomrat;
    } 
    if(req.query.endDate){
        const endDateFomrat= moment(req.query.endDate).startOf("day").toDate()
        dateFilter.$lte =  endDateFomrat;
    } 
    if(Object.keys(dateFilter).length > 0){
        find.createdAt = dateFilter;
    }

    // End lọc theo khoảng thời gian
    // Lọc theo danh mục
    const listCategory = await Category.find({
        deleted: false,
    })
    const buildCategoryTree = CategoryTree.CategoryTree(listCategory, "")
    if(req.query.category) {
        const parentId = req.query.category;

        const childIds = getAllChildIds.getAllChildIds(listCategory, parentId);

        const allIds = [parentId, ...childIds];

        find.category = { $in: allIds };
    }
    // End lọc theo danh mục 
    // search 
    if(req.query.keyword){
        const keyword = slugify(req.query.keyword, {
            lower: true
        });
        const regexKeyword = new RegExp(keyword);
        find.slug = regexKeyword;
    }
    // End search
    // Phân trang
    let limitItem = 20;
    let page = 1;
    if(req.query.page) {
        const pageCurrent = parseInt(req.query.page);
        if(pageCurrent > 0) {
            page = pageCurrent;
        }
    }
    const totalRecord = await Tour.countDocuments({});
    const totalPage = Math.ceil(totalRecord / limitItem);
    const skip = (page -1)*limitItem;
    const pagination = {
        totalRecord: totalRecord,
        totalPage: totalPage,
        skip: skip,
        pageCurrent: page
    };

    // End phân trang
    const tourList = await Tour
    .find(find)
    .skip(skip)
    .limit(limitItem)
    for(const item of tourList) {
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
    const accountAdminList = await AccountAdmin
    .find({
        status: "active"
    })
    .select("id fullName")
    // End danh sách tài khoản admin
    res.render('admin/pages/tour-list', {
        pageTitle: 'Quản lý tour',
        tourList: tourList,
        accountAdminList: accountAdminList,
        listCategory: buildCategoryTree,
        pagination: pagination
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
module.exports.changeMulti = async (req, res) => {
    const { option, ids } = req.body;

    switch (option) {
      case "active":
      case "inactive":
        await Tour.updateMany({
          _id: { $in: ids }
        }, {
          status: option
        });
        break;
      case "delete":
        await Tour.updateMany({
          _id: { $in: ids }
        }, {
          deleted: true,
          deletedAt: Date.now(),
          deletedBy: req.account.id
        });
        break;
    }

    res.json({
        code: "success",
        message: "Cập nhật trạng thái thành công"
    })
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;

    
     const listCategory = await Category.find({
        deleted: false,
    })

    const buildCategoryTree = CategoryTree.CategoryTree(listCategory, "")
    const infoTour = await Tour.findOne({
        _id: id,
        deleted: false
    });
    infoTour.departureDateFormat = moment(infoTour.departureDate).format('YYYY-MM-DD');
    const listCity = await City.find({});


    res.render('admin/pages/edit-tour', {
        pageTitle: 'Chỉnh sửa tour',
        infoTour: infoTour,
        cityList: listCity,
        categoryList: buildCategoryTree
    });

}
module.exports.editPatch = async (req, res) => {
    try {
    const id = req.params.id;

    if(req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const totalRecord = await Tour.countDocuments({});
      req.body.position = totalRecord + 1;
    }

    req.body.updatedBy = req.account.id;
    if(req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }
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

    await Tour.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: "success",
      message: "Cập nhật tour thành công"
    });
  } catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.deletePatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Tour.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: Date.now(),
      deletedBy: req.account.id
    });


    res.json({
      code: "success",
      message: "Xóa tour thành công"
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không tồn tại trong hệ thống!"
    })
  }
}
