// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  foreignKey: "category_id"
});


// Categories have many Products

Category.hasMany(Product, {
  // Define the third table needed to store the foreign keys
  foreignKey: "category_id",
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  through: ProductTag,
  // Define an alias for when data is retrieved
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: ProductTag,
  // Define an alias for when data is retrieved
  foreignKey: 'tag_id'
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
