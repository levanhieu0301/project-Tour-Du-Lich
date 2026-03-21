const CategoryTree = (listCategory, parentId = "") => {
  const tree  = []
  listCategory.forEach(item => {
    if(item.parent === parentId){
      const children = CategoryTree(listCategory,item.id )
      tree.push({
        id: item.id,
        name: item.name,
        children: children
     })
    }
  });
  return tree;

}

module.exports.CategoryTree = CategoryTree;