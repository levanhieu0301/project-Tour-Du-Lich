const CategoryTree = (listCategory, parentId = "") => {
  const tree  = []
  listCategory.forEach(item => {
    if(item.parent === parentId){
      const children = CategoryTree(listCategory,item.id )
      tree.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        children: children
     })
    }
  });
  return tree;

}
const getAllChildIds = (listCategory, parentId) => {
  let result = [];

  listCategory.forEach(item => {
    // So sánh đúng kiểu ObjectId
    if(item.parent && item.parent.toString() === parentId.toString()){
      result.push(item._id.toString());

      const childIds = getAllChildIds(listCategory, item._id);
      result = result.concat(childIds);
    }
  });

  return result;
};

module.exports.getAllChildIds = getAllChildIds;
module.exports.CategoryTree = CategoryTree;