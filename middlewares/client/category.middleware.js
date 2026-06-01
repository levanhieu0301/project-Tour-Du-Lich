const category = require("../../models/categories.model");
const buildCategoryTree = require("../../helpers/category-tree.helper");


module.exports.categoryList = async (req, res, next) => {
  const categoryList = await category.find();
  const categoryTree = buildCategoryTree.CategoryTree(categoryList);


  res.locals.category = categoryTree;

  next();
}