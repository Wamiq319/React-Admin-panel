import { getBrandSummary } from "./classification";

// Utility function to generate unique IDs
function generateUniqueId(prefix = "#") {
  const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}${randomStr}`;
}

// +++++++++++++++++++++++++++
// DATA FOR ATTRIBUTE PAGE
// +++++++++++++++++++++++++++
const variantTypes = [
  {
    id: generateUniqueId("VT-"),
    typeName: "European Size",
    displayName: "Shoe Size",
    variants: new Set(["38", "40", "42", "44"]), // Using Set for unique variant values
  },
  {
    id: generateUniqueId("VT-"),
    typeName: "Color",
    displayName: "Color",
    variants: new Set(["Black", "White", "Red"]),
  },
];

// ++++++++++++++++++++++++++++
// FUNCTIONS FOR ATTRIBUTE PAGE
// +++++++++++++++++++++++++++

// Create a new variant type
function createVariantType(newVariant) {
  const variantType = variantTypes.find(
    (type) => type.typeName === newVariant.typeName
  );

  if (variantType) {
    return "Variant type already exists, use a new name for variant type.";
  } else {
    const newVariantType = {
      id: generateUniqueId("VT-#"),
      typeName: newVariant.typeName,
      displayName: newVariant.displayName,
      variants: new Set(),
    };

    variantTypes.push(newVariantType);
    return "Variant type created successfully.";
  }
}

// Get all variant types
function getVariantTypeSummary() {
  // Map over variantTypes to create a summary array
  const variantTypesSummary = variantTypes.map((variantType) => {
    return {
      typeName: variantType.typeName,
      displayName: variantType.displayName,
      variantCount: variantType.variants.size,
      id: variantType.id,
    };
  });

  return variantTypesSummary;
}

function getVariantsSummary() {
  const variantSummary = variantTypes.flatMap((variantType) => {
    if (variantType.variants.size > 0) {
      return Array.from(variantType.variants).map((variant) => ({
        typeName: variantType.typeName,
        variant: variant,
      }));
    }
    return [];
  });

  return variantSummary.filter((item) => item !== null && item !== undefined);
}
function getVariantTypes() {
  const VariantTypes = getVariantTypeSummary();
  const dropdownOptions = VariantTypes.map((variant) => ({
    typeName: variant.typeName,
    variantTypeId: variant.id,
  }));
  return dropdownOptions;
}

// Delete a variant type by ID
function deleteVariantType(variantTypeId) {
  const index = variantTypes.findIndex((type) => type.id === variantTypeId);
  if (index !== -1) {
    return variantTypes.splice(index, 1)[0]; // Removes and returns the deleted variant type
  }
  return "ID does not exist.";
}

function addVariantToType(variantData) {
  const variantType = variantTypes.find((type) => {
    return type.id == variantData.variantTypeId;
  });

  if (!variantType) {
    return "Variant type not found.";
  }

  if (variantType.variants.has(variantData.name)) {
    return "Variant already exists for the type.";
  }

  variantType.variants.add(variantData.name);
  return "Variant added successfully.";
}

function getRelatedVariants(variantTypeId) {
  const VariantTypes = variantTypes;
  const matchedVariantType = VariantTypes.find(
    (variantType) => variantType.id === variantTypeId
  );

  if (matchedVariantType) {
    return matchedVariantType.variants;
  } else {
    return [];
  }
}

// Example export
export {
  createVariantType,
  getVariantsSummary,
  getVariantTypeSummary,
  addVariantToType,
  deleteVariantType,
  getVariantTypes,
  getRelatedVariants,
};
