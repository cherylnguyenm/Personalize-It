const ENGINE_TYPE_API_URL = '/api/engine-types';

// Get all engine types
export const getAllEngineTypes = async () => {
  try {
    const response = await fetch(`${ENGINE_TYPE_API_URL}`);
    if (!response.ok) {
      throw new Error('Error fetching engine types');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching engine types:', error);
    throw error;
  }
};

// Get a specific engine type by ID
export const getEngineType = async (id) => {
  try {
    const response = await fetch(`${ENGINE_TYPE_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching engine type with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching engine type with ID ${id}:`, error);
    throw error;
  }
};

// Create a new engine type
export const createEngineType = async (engineTypeData) => {
  try {
    const response = await fetch(`${ENGINE_TYPE_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(engineTypeData),
    });
    if (!response.ok) {
      throw new Error('Error creating engine type');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating engine type:', error);
    throw error;
  }
};

// Update an engine type by ID
export const updateEngineType = async (id, updatedEngineTypeData) => {
  try {
    const response = await fetch(`${ENGINE_TYPE_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEngineTypeData),
    });
    if (!response.ok) {
      throw new Error(`Error updating engine type with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating engine type with ID ${id}:`, error);
    throw error;
  }
};

// Delete an engine type by ID
export const deleteEngineType = async (id) => {
  try {
    const response = await fetch(`${ENGINE_TYPE_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting engine type with ID ${id}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting engine type with ID ${id}:`, error);
    throw error;
  }
};
