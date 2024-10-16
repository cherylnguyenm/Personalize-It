/**
 * Validates the selected feature combinations.
 * @param {object} selectedOptions - Object containing selected model, color, engineType, and interior.
 * @returns {boolean} - True if the combination is valid, false otherwise.
 */
 export const validateFeatureCombination = (selectedOptions) => {
    const { model, engineType, color, interior } = selectedOptions;
  
    // Example validation: Model X doesn't support Diesel engine
    if (model === 'Model X' && engineType === 'Diesel') {
      return false; // Invalid combination
    }
  
    // Example validation: Red color cannot be combined with Fabric interior
    if (color === 'Red' && interior === 'Fabric') {
      return false; // Invalid combination
    }
  
    // Add more rules as needed for validation
    return true; // If no rules were violated, return true
  };
  