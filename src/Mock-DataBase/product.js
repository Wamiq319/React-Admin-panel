function generateUniqueId(prefix = "#") {
  const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}${randomStr}`;
}

const products = [
  {
    id: generateUniqueId("P-"),
    productName: "iPhone 14",
    productDescription: "Latest Apple iPhone with advanced features.",
    price: 999,
    stockQuantity: 50,
    category: "Electronics",
    subCategory: "Mobile Phones",
    status: "publish",
    brand: "Apple",
    variant: "128GB",
    productImage: "https://picsum.photos/300?random=1", // Random image
  },
  {
    id: generateUniqueId("P-"),
    productName: "Samsung Galaxy S23",
    productDescription: "Flagship Samsung phone with top-notch camera.",
    price: 899,
    stockQuantity: 40,
    category: "Electronics",
    subCategory: "Mobile Phones",
    status: "publish",
    brand: "Samsung",
    variant: "256GB",
    productImage: "https://picsum.photos/300?random=2", // Random image
  },
  {
    id: generateUniqueId("P-"),
    productName: "Sony WH-1000XM5",
    productDescription: "Noise-cancelling over-ear headphones.",
    price: 399,
    stockQuantity: 30,
    category: "Electronics",
    subCategory: "Headphones",
    status: "publish",
    brand: "Sony",
    variant: "Black",
    productImage: "https://picsum.photos/300?random=3", // Random image
  },
  {
    id: generateUniqueId("P-"),
    productName: "Dell XPS 13",
    productDescription: "Lightweight and powerful ultrabook.",
    price: 1299,
    stockQuantity: 20,
    category: "Electronics",
    subCategory: "Laptops",
    status: "publish",
    brand: "Dell",
    variant: "16GB RAM, 512GB SSD",
    productImage: "https://picsum.photos/300?random=4", // Random image
  },
  {
    id: generateUniqueId("P-"),
    productName: "Nike Air Max 90",
    productDescription: "Classic and comfortable sneakers.",
    price: 150,
    stockQuantity: 60,
    category: "Fashion",
    subCategory: "Footwear",
    status: "publish",
    brand: "Nike",
    variant: "White/Black",
    productImage:
      "https://images.unsplash.com/photo-1695322353008-fb6647b1cf4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Random image
  },
];

function getProductSummary() {
  return products.map((product) => ({
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
    price: product.price,
    stockQuantity: product.stockQuantity,
    productImage: product.productImage,
  }));
}

export { getProductSummary };
