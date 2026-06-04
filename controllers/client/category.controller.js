const Category = require("../../models/categories.model");
const Tour = require("../../models/tour.model");
const City = require("../../models/cities.model");

const moment = require("moment");
module.exports.list = async (req, res) => {
    const breadcrumb = {
      image: "",
      title: "",
      list: [
        {
          link: "/",
          title: "Trang Chủ"
        },
        // {
        //   link: "/tours",
        //   title: "Tour Nước Ngoài"
        // }
      ]
    };
    const slug = req.params.slug;
    const category = await Category.findOne({
      slug: slug
    })

    if(category && category.parent){
      const parentCategory = await Category.findOne({
        _id: category.parent,
        deleted: false
      })
      if(parentCategory){
        breadcrumb.list.push({
          link: `/category/${parentCategory.slug}`,
          title: parentCategory.name
        })
      }
    }
    if(category){
      breadcrumb.list.push({
        link: `/category/${category.slug}`,
        title: category.name
      })
      breadcrumb.title = category.name;
      breadcrumb.image = category.avatar;
    }


  // End Breadcrumb
  // lấy hết tour theo category
  const listCategoryId = [];
  const childCategory = async (parentId) => {
    const childs = await Category.find({
      parent: parentId,
      deleted: false,
      status: "active"
    })
    for(const child of childs) {
      listCategoryId.push(child._id);

      await childCategory(child._id);
    }
  };
  await childCategory(category._id);

  
  const tourListSection9 = await Tour
    .find({
      category: { $in: [category.id, ...listCategoryId] },
      status: "active",
      deleted: false
    })
    .sort({
      position: "desc"
    })

  for(const item of tourListSection9) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }

  // End lấy hết tour theo category
  

  // Danh sách thành phố
  const cityList = await City.find({});
  // Hết Danh sách thành phố
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
    breadcrumb: breadcrumb,
    categoryTitle: category,
    tourListSection9: tourListSection9,
    cityList: cityList
  })
}
