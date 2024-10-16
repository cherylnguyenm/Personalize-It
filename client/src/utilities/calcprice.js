/**
 * Calculates the total price of the custom car based on selected options.
 * @param {object} selectedOptions - Object containing selected model, color, engineType, and interior.
 * @param {array} modelPrices - Array of available models with their prices.
 * @param {array} colorPrices - Array of available colors with their prices.
 * @param {array} engineTypePrices - Array of available engine types with their prices.
 * @param {array} interiorPrices - Array of available interiors with their prices.
 * @returns {number} - Total price of the custom car.
 */
 export const calculateTotalPrice = (selectedOptions, modelPrices, colorPrices, engineTypePrices, interiorPrices) => {
    let totalPrice = 0;
  
    // Find the price of the selected model
    const selectedModel = modelPrices.find(model => model.modelName === selectedOptions.model);
    if (selectedModel) {
      totalPrice += selectedModel.price;
    }
  
    // Find the price of the selected color
    const selectedColor = colorPrices.find(color => color.colorName === selectedOptions.color);
    if (selectedColor) {
      totalPrice += selectedColor.price;
    }
  
    // Find the price of the selected engine type
    const selectedEngineType = engineTypePrices.find(engineType => engineType.engineName === selectedOptions.engineType);
    if (selectedEngineType) {
      totalPrice += selectedEngineType.price;
    }
  
    // Find the price of the selected interior
    const selectedInterior = interiorPrices.find(interior => interior.interiorType === selectedOptions.interior);
    if (selectedInterior) {
      totalPrice += selectedInterior.price;
    }
  
    return totalPrice;
  };
  