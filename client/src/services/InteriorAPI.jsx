const INTERIOR_API_URL = '/api/interiors';

// Get all interiors
export const getAllInteriors = async () => {
  try {
    const response = await fetch(`${INTERIOR_API_URL}`);
    if (!response.ok) {
      throw new Error('Error fetching interiors');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching interiors:', error);
    throw error;
  }
};

// Get a specific interior by ID
export const getInterior = async (id) => {
  try {
    const response = await fetch(`${INTERIOR_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching interior with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching interior with ID ${id}:`, error);
    throw error;
  }
};

// Create a new interior
export const createInterior = async (interiorData) => {
  try {
    const response = await fetch(`${INTERIOR_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interiorData),
    });
    if (!response.ok) {
      throw new Error('Error creating interior');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating interior:', error);
    throw error;
  }
};

// Update an interior by ID
export const updateInterior = async (id, updatedInteriorData) => {
  try {
    const response = await fetch(`${INTERIOR_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInteriorData),
    });
    if (!response.ok) {
      throw new Error(`Error updating interior with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating interior with ID ${id}:`, error);
    throw error;
  }
};

// Delete an interior by ID
export const deleteInterior = async (id) => {
  try {
    const response = await fetch(`${INTERIOR_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting interior with ID ${id}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting interior with ID ${id}:`, error);
    throw error;
  }
};
