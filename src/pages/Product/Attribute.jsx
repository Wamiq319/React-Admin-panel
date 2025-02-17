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
import { showNotification } from "../../redux/slices/notificationslice";
// Mock Data
import {
  createVariantType,
  getVariantsSummary,
  getVariantTypeSummary,
  addVariantToType,
  getVariantTypes,
} from "../../Mock-DataBase";

const AttributePage = () => {
  // ===========================
  // Redux & State Slices
  // ===========================
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notification);
  const words = useSelector((state) => state.lang.words);

  // ===========================
  // Component States
  // ===========================
  const [activeTab, setActiveTab] = useState("type");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [modalDropDown, SetModalDropDown] = useState([]);

  // ===========================
  // Table Headers
  // ===========================
  const tableHeaders = {
    type: [
      { key: "typeName", label: "VariantType" },
      { key: "displayName", label: "DisplayName" },
      { key: "variantCount", label: "TotalVariants" },
    ],
    name: [
      { key: "typeName", label: "VariantType" },
      { key: "variant", label: "Variant" },
    ],
  };

  // ===========================
  // Button & Tab Configuration
  // ===========================

  const navPageMenu = [
    { key: "type", label: words["Variant Type"] },
    { key: "name", label: words["Variant"] },
  ];
  const buttons = {
    type: {
      key: "type",
      label: words["Variant Type"],
      modalheading: words["Add Variant Type"],
    },
    name: {
      key: "name",
      label: words["Variant"],
      modalheading: words["Add Variant"],
    },
  };

  // ===========================
  // Effects
  // ===========================
  useEffect(() => {
    const fetchData = () => {
      try {
        setIsLoading(true);
        let response;
        switch (activeTab) {
          case "type":
            response = getVariantTypeSummary();
            break;
          case "name":
            response = getVariantsSummary();
            const dropdownOptions = getVariantTypes;
            SetModalDropDown(dropdownOptions);
            break;
          default:
            break;
        }
        setTableData(response);
      } catch (error) {
        // Handle errors if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // ===========================
  // Helper Functions
  // ===========================
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
    setIsTransitioning(true);
    setIsLoading(true);
    setFormData({});
    setTimeout(() => {
      setActiveTab(key);
      setIsLoading(false);
      setIsTransitioning(false);
    }, 500);
  };

  const handleOpenModal = () => {
    setFormData({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormData({});
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    let message = "";

    switch (activeTab) {
      case "type":
        if (!formData.typeName) {
          triggerNotification("Enter Type Name", 2000, "bg-red-500");
          return;
        }

        if (!formData.displayName) {
          triggerNotification("Enter Display Name", 2000, "bg-red-500");
          return;
        }

        message = createVariantType(formData);
        const updatedData = getVariantTypeSummary();
        setTableData(updatedData);

        const uniqueTypeNames = [
          ...new Set(updatedData.map((variant) => variant.typeName)),
        ];
        SetModalDropDown(uniqueTypeNames);
        break;

      case "name":
        if (!formData.variantTypeId) {
          triggerNotification("Select the Variant Type", 2000, "bg-red-500");
          return;
        }

        if (!formData.name) {
          triggerNotification("Enter Variant Name", 2000, "bg-red-500");
          return;
        }

        message = addVariantToType(formData);
        const updatedVariantData = getVariantsSummary();
        setTableData(updatedVariantData);
        break;

      default:
        return;
    }

    triggerNotification(message);
    setFormData({});
    setIsModalOpen(false);
  };

  // ===========================
  // Render Modal Content
  // ===========================
  const renderModalContent = () => {
    switch (activeTab) {
      case "type":
        return (
          <div className="flex justify-between  mb-2">
            <InputField
              label={words["Variant Type"]}
              name="typeName"
              value={formData.typeName || ""}
              placeholder={words["Enter Variant type"]}
              onChange={handleInputChange}
            />
            <InputField
              label={words["Display Name"]}
              name="displayName"
              value={formData.displayName || ""}
              placeholder={words["Enter Display Name"]}
              onChange={handleInputChange}
            />
          </div>
        );
      case "name":
        return (
          <div className="flex justify-between mb-2">
            <InputField
              type="select"
              placeholder={words["Choose Variant Type"]}
              options={modalDropDown.map((type) => ({
                value: type.variantTypeId,
                label: type.typeName,
              }))}
              label={words["Variant Type"]}
              name="variantTypeId"
              value={formData.variantTypeId}
              onChange={handleInputChange}
            />
            <InputField
              label={words["Variant Name"]}
              name="name"
              value={formData.name || ""}
              placeholder={words["Enter Variant Name"]}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // ===========================
  // JSX Return
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
        title={words["Add Product Attributes"]}
        breadcrumbs={[
          { label: words["Home"], link: "/home/dashboard" },
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Dashboard"] },
        ]}
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
            onClick={() => handleOpenModal(buttons[activeTab].key)}
          />
        </div>
      </div>

      <div
        className={`mt-4 transition-opacity flex justify-center duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
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

export default AttributePage;
