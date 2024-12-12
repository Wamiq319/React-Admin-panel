// React & Redux
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Icons
import { FaPlus } from "react-icons/fa";

// Components
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import PageNav from "../../components/PageNav";
import { Button, InputField } from "../../components/FormComponents";
import Modal from "../../components/Modal";
import SearchInput from "../../components/Search";
import Spinner from "../../components/Spinner";
import Notification from "../../components/Notification";

// Mock Data
import {
  getBrandSummary,
  getCategoriesSummary,
  getSubCategoriesSummary,
  getCategories,
  getSubCategories,
  createCategory,
  createSubCategory,
  createBrand,
} from "../../Mock-DataBase";

// Redux Actions & State Slices
import { showNotification } from "../../redux/slices/notificationslice";

const ClassificationPage = () => {
  // ===========================
  // Redux & State Slices
  // ===========================
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notification);
  const words = useSelector((state) => state.lang.words);

  // ===========================
  // Component States
  // ===========================
  const [activeTab, setActiveTab] = useState("category");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalDropDown, SetModalDropdown] = useState([]);
  const [formData, setFormData] = useState({});
  const [categoryImage, setCategoryImage] = useState(null);
  const [tableData, setTableData] = useState([]);

  // ===========================
  // Table Headers
  // ===========================
  const tableHeaders = {
    category: [
      { key: "image", label: "Image" },
      { key: "categoryName", label: "Category" },
      { key: "totalSubcategories", label: "Total-SubCategories" },
      { key: "totalBrands", label: "Total-Brands" },
    ],
    subcategory: [
      { key: "subCategoryName", label: "SubCategory" },
      { key: "categoryName", label: "Category" },
      { key: "totalBrands", label: "Total-Brand" },
    ],
    brand: [
      { key: "brandName", label: "Brand" },
      { key: "subCategoryName", label: "SubCategory" },
    ],
  };

  // ===========================
  // Button & Tab Configuration
  // ===========================
  const buttons = {
    category: {
      key: "category",
      label: words["Category"],
      modalheading: words["Add Category"],
    },
    subcategory: {
      key: "subcategory",
      label: words["SubCategory"],
      modalheading: words["Add SubCategory"],
    },
    brand: {
      key: "brand",
      label: words["Brand"],
      modalheading: words["Add Brand"],
    },
  };

  const navPageMenu = [
    { key: "category", label: words["Categories"] },
    { key: "subcategory", label: words["SubCategories"] },
    { key: "brand", label: words["Brand"] },
  ];
  // ===========================
  // Effects
  // ===========================
  useEffect(() => {
    const fetchData = () => {
      try {
        setIsLoading(true);
        let dropdownOptions = [];
        let response;
        switch (activeTab) {
          case "category":
            response = getCategoriesSummary();
            break;

          case "subcategory":
            response = getSubCategoriesSummary();
            dropdownOptions = getCategories;

            break;
          case "brand":
            response = getBrandSummary();
            dropdownOptions = getSubCategories;

            break;
          default:
            break;
        }
        SetModalDropdown(dropdownOptions);

        setTableData(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // ===========================
  // Helper Functions
  // ===========================
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCategoryImage(imageUrl);
      setFormData((prevData) => ({
        image: imageUrl,
      }));
    }
  };
  const triggerNotification = (message, duration = 2000, className = "") => {
    dispatch(
      showNotification({
        message,
        duration,
        className,
      })
    );
  };

  const handleTabClick = (key) => {
    setIsLoading(true);
    setFormData({});
    setTimeout(() => {
      setActiveTab(key);
      setIsLoading(false);
    }, 500);
  };

  const handleOpenModal = (key) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let message = "";
    let updatedData = "";

    switch (activeTab) {
      case "category":
        if (!formData.image) {
          triggerNotification("Upload Image for Category", 2000, "bg-red-500");
          return;
        }

        if (!formData.categoryName) {
          triggerNotification("Enter Category Name", 2000, "bg-red-500");
          return;
        }

        message = createCategory(formData);
        updatedData = getCategoriesSummary();

        setTableData(updatedData);

        break;

      case "subcategory":
        if (!formData.categoryId) {
          triggerNotification("Select the Category", 2000, "bg-red-500");
          return;
        }

        if (!formData.subCategoryName) {
          triggerNotification("Enter SubCategoryName", 2000, "bg-red-500");
          return;
        }

        message = createSubCategory(formData);

        updatedData = getSubCategoriesSummary();

        break;
      case "brand":
        console.log(formData);
        if (!formData.subCategoryId) {
          triggerNotification("Select the Sub Category", 2000, "bg-red-500");
          return;
        }

        if (!formData.brandName) {
          triggerNotification("Enter Brand Name", 2000, "bg-red-500");
          return;
        }

        message = createBrand(formData);

        updatedData = getBrandSummary();

        break;

      default:
        return;
    }
    setTableData(updatedData);
    triggerNotification(message);
    setFormData({});
    setIsModalOpen(false);
  };

  // ===========================
  // Render Modal Content
  // ===========================
  const renderModalContent = () => {
    switch (activeTab) {
      case "category":
        return (
          <div className="flex flex-col justify-center w-full mb-2">
            <div
              key="category-image"
              className="rounded-md w-40 h-40 border-2 border-dashed border-orange-500 p-1 mx-auto"
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("image-upload").click()}
            >
              {categoryImage ? (
                <img
                  src={categoryImage}
                  className="w-full h-full object-scale-down"
                  alt="Category"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  {words["Click to upload"]}
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <InputField
              label={words["Category"]}
              name="categoryName"
              value={formData.Category}
              placeholder={words["Enter Category Name"]}
              onChange={handleInputChange}
            />
          </div>
        );
      case "subcategory":
        return (
          <div className="flex justify-between mb-2">
            <InputField
              type="select"
              placeholder={words["Choose Category"]}
              options={modalDropDown.map((option) => ({
                value: option.categoryId,
                label: option.categoryName,
              }))}
              label={words["Category"]}
              name="categoryId"
              onChange={handleInputChange}
            />
            <InputField
              label={words["SubCategory"]}
              name="subCategoryName"
              value={formData.SubCategory}
              placeholder={words["Enter Subcategory Name"]}
              onChange={handleInputChange}
            />
          </div>
        );
      case "brand":
        return (
          <div className="flex justify-between mb-2">
            <InputField
              type="select"
              placeholder={words["Choose Sub-Category"]}
              options={modalDropDown.map((option) => ({
                value: option.subCategoryId,
                label: option.subCategoryName,
              }))}
              label={words["SubCategory"]}
              name="subCategoryId"
              onChange={handleInputChange}
            />
            <InputField
              label={words["Brand"]}
              name="brandName"
              value={formData.brandName || ""}
              placeholder={words["Enter Brand Name"]}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // ===========================
  // JSX Render
  // ===========================
  return (
    <div className="variantPage-wrapper bg-none">
      {notificationState.visible && (
        <Notification
          message={notificationState.message}
          duration={notificationState.duration}
          className={notificationState.className}
        />
      )}
      <PageHeader
        title={words["Classify the Product"]}
        breadcrumbs={`${words["Home"]} ~ ${words["Products"]} ~ ${words["Classification"]}`}
      />

      <div className="mt-4 flex justify-start">
        <div className="w-80">
          <SearchInput className="w-72" />
        </div>
        <PageNav
          className="flex-1"
          menuItems={navPageMenu}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="flex flex-1 justify-end">
          <Button
            key={buttons[activeTab].key}
            text={buttons[activeTab].label}
            icon={<FaPlus />}
            className="text-sm mx-1 w-1/3"
            onClick={() => handleOpenModal(activeTab)}
          />
        </div>
      </div>

      <div
        className={`mt-4 transition-opacity flex justify-center duration-1000`}
      >
        {isLoading ? (
          <Spinner size={3} opacity={100} />
        ) : (
          <DataTable
            tableHeader={tableHeaders[activeTab]}
            tableData={tableData}
            searchTerm={searchTerm}
            searchColumn="name"
            sortKey="id"
            sortDirection="ascending"
            buttons={null}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalheading={buttons[activeTab].modalheading}
      >
        {renderModalContent()}
        <Button
          className="mx-auto w-72 text-3xl"
          text="Submit"
          onClick={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default ClassificationPage;
