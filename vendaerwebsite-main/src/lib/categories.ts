// Centralized categories data
export const productCategories = [
  'Electronics',
  'Furniture', 
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Health & Beauty',
  'Automotive',
  'Food & Beverages'
];

export const getCategoryOptions = () => {
  return productCategories.map(category => ({
    value: category.toLowerCase().replace(/\s+/g, '-'),
    label: category
  }));
};