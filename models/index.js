// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  
  foreignKey: "category_id"
  // Define the third table needed to store the foreign keys
  // through: { // might need to be removed
  // model: Product, 
  // unique: false },  
  // foreignKey: "category_id"
});


//   // Define an alias for when data is retrieved
//   as: 'category_id'
// });

// Categories have many Products

Category.hasMany(Product, {
  // Define the third table needed to store the foreign keys
  foreignKey: "category_id",
  // through: { 
  //   model: Product,
  //   unique: false
  // },
});

  
//   // Define an alias for when data is retrieved
//   as: 'product_id'
// }
// );


// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'product_id'
});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'tag_id'
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
