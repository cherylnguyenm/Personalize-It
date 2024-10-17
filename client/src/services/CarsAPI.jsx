const API_URL = '/api/custom-items'; // Base API URL for custom items

// Get all cars
export const getAllCars = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Error fetching cars');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Get a specific car by ID
export const getCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching car with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error);
    throw error;
  }
};

// Create a new car
export const createCar = async (carData) => {
  try {
    // Calculate total price based on the selected features
    const totalPrice = calculateTotalPrice(carData);
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...carData, totalPrice }), // Send the total price with car data
    });
    if (!response.ok) {
      throw new Error('Error creating car');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

// Update an existing car by ID
export const updateCar = async (id, updatedCarData) => {
  try {
    // Recalculate the total price when updating
    const totalPrice = calculateTotalPrice(updatedCarData);
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedCarData, totalPrice }),
    });
    if (!response.ok) {
      throw new Error(`Error updating car with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating car with ID ${id}:`, error);
    throw error;
  }
};

// Delete a car by ID
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting car with ID ${id}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting car with ID ${id}:`, error);
    throw error;
  }
};

// Helper function to calculate the total price based on selected features
const calculateTotalPrice = (carData) => {
  let totalPrice = 0;
  
  // Assuming each feature has a price associated with it
  if (carData.model && carData.model.price) {
    totalPrice += carData.model.price;
  }
  if (carData.color && carData.color.price) {
    totalPrice += carData.color.price;
  }
  if (carData.engineType && carData.engineType.price) {
    totalPrice += carData.engineType.price;
  }
  if (carData.interior && carData.interior.price) {
    totalPrice += carData.interior.price;
  }

  return totalPrice;
};
