import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import PageNav from "../../components/PageNav";
import { Button, InputField } from "../../components/FormComponents";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import SearchInput from "../../components/Search";
import Spinner from "../../components/Spinner";
import { getCategorySummary } from "../../Mock-DataBase/classification";

const ClassificationPage = () => {
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notification);
  const words = useSelector((state) => state.lang.words);

  const [categoryImage, setCategoryImage] = useState(null);
  const [activeTab, setActiveTab] = useState("type");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalheading, setModalHeading] = useState("");

  const [buttonConfigs, SetButtonConfigs] = useState({
    key: "category",
    label: words["Category"],
    modalheading: words["Add Category"],
  });

  const [formData, setFormData] = useState({
    Category: "",
    CategoryImage: "",
    SubCategory: "",
    BrandName: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file); // Define the new image
      setCategoryImage(newImage); // Set the image
    }
  };

  const menuItems = [
    {
      key: "category",
      label: words["Categories"],
    },
    { key: "subcategory", label: words["SubCategories"] },
    { key: "brand", label: words["Brand"] },
  ];

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

  const handleTabClick = (key) => {
    SetButtonConfigs(buttons[key]);
    if (key !== activeTab) {
      setIsTransitioning(true);
      setIsLoading(true);
      setTimeout(() => {
        setActiveTab(key);
        setIsLoading(false);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleOpenModal = (key, modalheading) => {
    setModalHeading(modalheading);
    setModalType(key);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "category":
        return (
          <div className="flex flex-col justify-center w-full mb-2">
            <div
              key="category-image"
              className="rounded-md w-40 h-40 border-2 border-dashed border-orange-500 p-1 mx-auto"
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("image-upload").click()}
            >
              {/* Image Display */}
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
              name="Category"
              value={formData.Category}
              placeholder={words["Enter Category Name"]}
              onChange={handleInputChange}
              className="mx-0"
            />
          </div>
        );
      case "subcategory":
        return (
          <div className="flex justify-between mb-2">
            <InputField
              type="select"
              placeholder={words["Choose Category"]}
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "furniture", label: "Furniture" },
                { value: "clothing", label: "Clothing" },
              ]}
              label={words["Variant Type"]}
              name="variantType"
              value={formData.variantName}
              onChange={handleInputChange}
            />
            <InputField
              label={words["SubCategory"]}
              name="subcategory"
              value={formData.SubCategory}
              placeholder={words["Enter subcategory name"]}
              onChange={handleInputChange}
            />
          </div>
        );
      case "brand":
        return (
          <div className="flex justify-between mb-2">
            <InputField
              type="select"
              placeholder={words["Choose Category"]}
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "furniture", label: "Furniture" },
                { value: "clothing", label: "Clothing" },
              ]}
              label={words["Variant Type"]}
              name="variantType"
              value={formData.variantName}
              onChange={handleInputChange}
            />
            <InputField
              label={words["Brand"]}
              name="brandName"
              value={formData.BrandName}
              placeholder={words["Enter Brand Name"]}
              onChange={handleInputChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const nameData = [
    { id: 1, variantName: "Name X", detail: "Detail for Name X" },
    { id: 2, variantName: "Name Y", detail: "Detail for Name Y" },
  ];
  const nameColumns = [
    { title: "ID", field: "id" },
    { title: "Variant Name", field: "variantName" },
    { title: "Detail", field: "detail" },
  ];

  return (
    <div className="variantPage-wrapper bg-none">
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
          menuItems={menuItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="flex flex-1 justify-end">
          <Button
            key={buttonConfigs.key}
            text={buttonConfigs.label}
            icon={<FaPlus />}
            className="text-sm mx-1 w-1/3"
            onClick={() =>
              handleOpenModal(buttonConfigs.key, buttonConfigs.modalheading)
            }
          />
        </div>
      </div>

      <div
        className={`mt-4 transition-opacity flex justify-center duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {isLoading ? <Spinner size={3} opacity={100} /> : <div>hello</div>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalheading={modalheading}
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
