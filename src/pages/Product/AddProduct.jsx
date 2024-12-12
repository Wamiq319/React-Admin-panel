import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import { InputField, Button } from "../../components/FormComponents";
import PageHeader from "../../components/PageHeader";

// Icons`
import { FaSave, FaPlus, FaUpload } from "react-icons/fa";

// Mock Data
import {
  getCategories,
  getRelatedSubCategories,
  getVariantTypes,
  getRelatedBrands,
  getRelatedVariants,
} from "../../Mock-DataBase";

const ProductUploadPage = () => {
  // ===========================
  // Redux & State Slices
  // ===========================
  const words = useSelector((state) => state.lang.words);

  // ===========================
  // Component States
  // ===========================
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    productTitle: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    variantType: "",
    variants: [],
    stock: "",
    images: [],
  });
  const [images, setImages] = useState([null, null, null, null, null]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [variants, setVariants] = useState([]);

  // ===========================
  // Fetch Data on Mount
  // ===========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setCategoryOptions(categories);

        const variants = await getVariantTypes();
        setVariantOptions(variants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const subCategories = getRelatedSubCategories(formData.category);
    setSubCategoryOptions(subCategories);
  }, [formData, formData.category]);

  useEffect(() => {
    const Brands = getRelatedBrands(formData.subcategory);

    setBrandOptions(Brands);
  }, [formData, formData.subcategory]);

  useEffect(() => {
    const variants = getRelatedVariants(formData.variantType);
    setVariants(variants);
    console.log(variants);
  }, [formData, formData.variantType]);

  // ===========================
  // Helper Functions
  // ===========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      productId ? "Updating product:" : "Creating new product:",
      formData
    );
    // Add your API call here
  };

  return (
    <div className="product-page-wrapper bg-none">
      {/* Page Header */}
      <PageHeader
        title={words["Product Upload"]}
        breadcrumbs={`${words["Home"]}~${words["Products"]}~${words["Product Upload"]}`}
      />

      {/* Product Upload Form */}
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="flex justify-between">
          {/* Left Section */}
          <div className="bg-white p-3 rounded-lg shadow-lg w-3/5">
            {/* Product Title */}
            <InputField
              label={words["Product Title"]}
              name="productTitle"
              placeholder={words["Enter Product Title"]}
              value={formData.productTitle}
              onChange={handleInputChange}
            />

            {/* Description */}
            <InputField
              label={words["Product Details"]}
              name="description"
              type="richtext"
              value={formData.description}
              onChange={handleInputChange}
            />

            {/* Price and Stock */}
            <div className="flex gap-4">
              <InputField
                label={words["Price"]}
                type="number"
                name="price"
                placeholder={words["Enter Product Price"]}
                value={formData.price}
                onChange={handleInputChange}
              />
              <InputField
                label={words["Stock"]}
                type="number"
                name="stock"
                placeholder={words["Enter Product Stock"]}
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>

            {/* Category and Subcategory */}
            <div className="flex gap-4 mt-3">
              <InputField
                label={words["Category"]}
                type="select"
                name="category"
                placeholder={words["Choose Category"]}
                options={categoryOptions.map((option) => ({
                  value: option.categoryId,
                  label: option.categoryName,
                }))}
                value={formData.category}
                onChange={handleInputChange}
              />

              <InputField
                label={words["SubCategory"]}
                type="select"
                name="subcategory"
                placeholder={words["Choose SubCategory"]}
                options={subCategoryOptions.map((option) => ({
                  value: option.subCategoryId,
                  label: option.subCategoryName,
                }))}
                value={formData.subcategory}
                onChange={handleInputChange}
              />
              <InputField
                label={words["Brand"]}
                type="select"
                name="productBrand"
                options={brandOptions.map((option) => ({
                  value: option.brandId,
                  label: option.brandName,
                }))}
                placeholder={words["Choose Product Brand"]}
                value={formData.productBrand}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-3 rounded-lg shadow-lg w-[39%]">
            {/* Brand and Variant */}
            <div className="flex ">
              <InputField
                label={words["Variant"]}
                type="select"
                name="variantType"
                placeholder={words["Choose Variant Type"]}
                options={variantOptions.map((option) => ({
                  value: option.variantTypeId,
                  label: option.typeName,
                }))}
                value={formData.variantType}
                onChange={handleInputChange}
              />

              <Button
                text="Add"
                icon={<FaPlus />}
                className="text-sm h-[43px] w-40 mt-auto"
              />
            </div>
            <div className="flex flex-wrap m-1">
              {variants instanceof Set &&
                [...variants].map(
                  (
                    variant,
                    index // Convert the Set to an Array using the spread operator
                  ) => (
                    <span
                      key={index}
                      className="bg-orange-500 m-1 text-white p-1 mx-1 rounded-md flex relative"
                    >
                      <p className="px-4">{variant}</p>
                      <button className="text-white rounded-full shadow-md absolute top-0 right-0 p-1 w-5 h-5 flex items-center justify-center">
                        x
                      </button>
                    </span>
                  )
                )}
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white mt-4 p-3 rounded-lg shadow-lg">
          <div className="flex justify-around">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative cursor-pointer w-48 h-48 border-2 border-dashed border-orange-500 p-1 rounded-md"
                onClick={() =>
                  document.getElementById(`image-upload-${index}`).click()
                }
              >
                {image ? (
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    {words["Click to upload"]}
                  </div>
                )}
                <input
                  id={`image-upload-${index}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit and Save Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            type="submit"
            text={productId ? words["Update Product"] : words["Add Product"]}
            icon={productId ? <FaUpload /> : <FaPlus />}
            className="w-1/2"
          />
          <Button
            type="button"
            text={words["Save Draft"]}
            icon={<FaSave />}
            className="w-[49%]"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductUploadPage;
