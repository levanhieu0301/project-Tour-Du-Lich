const Category = require("../../models/categories.model");

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
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
    breadcrumb: breadcrumb,
    categoryTitle: category
  })
}
