const COLOR_API_URL = '/api/colors';

// Get all colors
export const getAllColors = async () => {
  try {
    const response = await fetch(`${COLOR_API_URL}`);
    if (!response.ok) {
      throw new Error('Error fetching colors');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

// Get a specific color by ID
export const getColor = async (id) => {
  try {
    const response = await fetch(`${COLOR_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching color with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching color with ID ${id}:`, error);
    throw error;
  }
};

// Create a new color
export const createColor = async (colorData) => {
  try {
    const response = await fetch(`${COLOR_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    });
    if (!response.ok) {
      throw new Error('Error creating color');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating color:', error);
    throw error;
  }
};

// Update a color by ID
export const updateColor = async (id, updatedColorData) => {
  try {
    const response = await fetch(`${COLOR_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedColorData),
    });
    if (!response.ok) {
      throw new Error(`Error updating color with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating color with ID ${id}:`, error);
    throw error;
  }
};

// Delete a color by ID
export const deleteColor = async (id) => {
  try {
    const response = await fetch(`${COLOR_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting color with ID ${id}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting color with ID ${id}:`, error);
    throw error;
  }
};
