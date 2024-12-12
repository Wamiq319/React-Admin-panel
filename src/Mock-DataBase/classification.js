// Utility function to generate unique IDs
function generateUniqueId(prefix = "#") {
  const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}${randomStr}`;
}

// +++++++++++++++++++++++++++
// DATA FOR CLASSIFICATION PAGE
// +++++++++++++++++++++++++++

const categories = [
  {
    id: generateUniqueId("C-"),
    categoryName: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/2777/2777142.png",
  },
  {
    id: generateUniqueId("C-"),
    categoryName: "Clothing",
    image: "https://cdn-icons-png.flaticon.com/512/821/821528.png",
  },
  {
    id: generateUniqueId("C-"),
    categoryName: "Sports",
    image: "https://cdn-icons-png.flaticon.com/512/857/857492.png",
  },
];

const subcategories = [
  {
    id: generateUniqueId("SC-"),
    categoryId: categories[0].id,
    subCategoryName: "Mobile Phones",
  },
  {
    id: generateUniqueId("SC-"),
    categoryId: categories[0].id,
    subCategoryName: "Laptops",
  },
];

const brands = [
  {
    id: generateUniqueId("B-"),
    subCategoryId: subcategories[0].id,
    brandName: "Apple",
  },
  {
    id: generateUniqueId("B-"),
    subCategoryId: subcategories[1].id,
    brandName: "Apple",
  },
  {
    id: generateUniqueId("B-"),
    subCategoryId: subcategories[1].id,
    brandName: "Dell",
  },
];

// ++++++++++++++++++++++++++++
// FUNCTIONS FOR CLASSIFICATION PAGE
// +++++++++++++++++++++++++++

// Get all categories with additional details (total subcategories and brands)
function getCategoriesSummary() {
  return categories.map((category) => {
    // Get all subcategories linked to this category
    const categorySubcategories = subcategories.filter(
      (subCategory) => subCategory.categoryId === category.id
    );

    // Get all brands linked to subcategories of this category
    const categoryBrands = brands.filter((brand) =>
      categorySubcategories.filter(
        (subCategory) => subCategory.id === brand.subCategoryId
      )
    );

    return {
      id: category.id,
      categoryName: category.categoryName,
      image: category.image,
      totalSubcategories: categorySubcategories.length,
      totalBrands: categoryBrands.length,
    };
  });
}

function getSubCategoriesSummary() {
  return subcategories.map((subCategory) => {
    let category = categories.filter(
      (category) => category.id === subCategory.categoryId
    );

    const Brands = brands.filter(
      (brand) => brand.subCategoryId === subCategory.id
    );

    return {
      id: subCategory.id,
      subCategoryName: subCategory.subCategoryName,
      categoryName: category[0].categoryName,
      categoryId: subCategory.categoryId,
      totalBrands: Brands.length,
    };
  });
}

function getBrandSummary() {
  return brands.map((brand) => {
    let subcategory = subcategories.filter(
      (subCategory) => subCategory.id === brand.subCategoryId
    );
    return {
      id: brand.id,
      brandName: brand.brandName,
      subCategoryName: subcategory[0].subCategoryName,
      subCategoryId: brand.subCategoryId,
    };
  });
}

function getCategories() {
  const Categories = getCategoriesSummary();
  const dropdownOptions = Categories.map((category) => ({
    categoryName: category.categoryName,
    categoryId: category.id,
  }));
  return dropdownOptions;
}

function getSubCategories() {
  const subCategories = getSubCategoriesSummary();
  const dropdownOptions = subCategories.map((subcategory) => ({
    subCategoryName: subcategory.subCategoryName,
    subCategoryId: subcategory.id,
  }));

  return dropdownOptions;
}

function getRelatedSubCategories(categoryId) {
  const subCategories = getSubCategoriesSummary();
  const dropdownOptions = subCategories
    .filter((subcategory) => subcategory.categoryId === categoryId) // Ensure correct comparison with categoryId
    .map((subcategory) => ({
      subCategoryName: subcategory.subCategoryName,
      subCategoryId: subcategory.id,
    }));

  return dropdownOptions;
}

function getRelatedBrands(subCategoryId) {
  const Brands = getBrandSummary();

  const dropdownOptions = Brands.filter(
    (brand) => brand.subCategoryId === subCategoryId
  ) // Ensure correct comparison with categoryId
    .map((brand) => ({
      brandName: brand.brandName,
      brandId: brand.id,
    }));

  return dropdownOptions;
}

function createCategory(newCategory) {
  const existingCategory = categories.find(
    (category) => newCategory.categoryName === category.categoryName
  );

  if (existingCategory) {
    console.log(existingCategory);
    return "Category already exists, use a new name.";
  } else {
    const newCategoryEntry = {
      id: generateUniqueId("C-"),
      categoryName: newCategory.categoryName,
      image: newCategory.image,
    };

    categories.push(newCategoryEntry);
    return "Category created successfully.";
  }
}

function createSubCategory(newSubCategory) {
  const existingSubCategory = subcategories.find((subcategory) => {
    return (
      subcategory.categoryId === newSubCategory.categoryId &&
      subcategory.subCategoryName === newSubCategory.subCategoryName
    );
  });

  if (existingSubCategory) {
    return "SubCategory already exists in this Category";
  } else {
    const newSubCategoryEntry = {
      id: generateUniqueId("C-"),
      categoryId: newSubCategory.categoryId,
      subCategoryName: newSubCategory.subCategoryName,
    };
    subcategories.push(newSubCategoryEntry);
    return "Category created successfully.";
  }
}
function createBrand(newBrand) {
  const existingBrand = brands.find((brand) => {
    return (
      brand.subCategoryId === newBrand.subCategoryId &&
      brand.brandName === newBrand.brandName
    );
  });

  if (existingBrand) {
    return "Brand already exists in this Sub Category";
  } else {
    console.log(newBrand);
    const newBrandEntry = {
      id: generateUniqueId("B-"),
      subCategoryId: newBrand.subCategoryId,
      brandName: newBrand.brandName,
    };
    brands.push(newBrandEntry);
    return "Brand created successfully.";
  }
}

export {
  getBrandSummary,
  getRelatedBrands,
  getCategoriesSummary,
  getSubCategoriesSummary,
  getCategories,
  getSubCategories,
  createCategory,
  createSubCategory,
  createBrand,
  getRelatedSubCategories,
};
