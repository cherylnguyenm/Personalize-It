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
  
    // Find the price of the selected model and add it to total price
    const selectedModel = modelPrices.find(model => model.modelname === selectedOptions.modelname);
    if (selectedModel) {
      totalPrice += parseFloat(selectedModel.price); // Ensure the price is treated as a number
    }
  
    // Find the price of the selected color and add it to total price
    const selectedColor = colorPrices.find(color => color.colorname === selectedOptions.colorname);
    if (selectedColor) {
      totalPrice += parseFloat(selectedColor.price); // Ensure the price is treated as a number
    }
  
    // Find the price of the selected engine type and add it to total price
    const selectedEngineType = engineTypePrices.find(engine => engine.enginename === selectedOptions.enginename);
    if (selectedEngineType) {
      totalPrice += parseFloat(selectedEngineType.price); // Ensure the price is treated as a number
    }
  
    // Find the price of the selected interior and add it to total price
    const selectedInterior = interiorPrices.find(interior => interior.interiortype === selectedOptions.interiortype);
    if (selectedInterior) {
      totalPrice += parseFloat(selectedInterior.price); // Ensure the price is treated as a number
    }
  
    return totalPrice;
  };
  