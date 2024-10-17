const MODEL_API_URL = '/api/models';

// Get all models
export const getAllModels = async () => {
  try {
    const response = await fetch(MODEL_API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching models: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

// Get a specific model by ID
export const getModel = async (id) => {
  try {
    const response = await fetch(`${MODEL_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching model with ID ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching model with ID ${id}:`, error);
    throw error;
  }
};

// Create a new model
export const createModel = async (modelData) => {
  try {
    const response = await fetch(MODEL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modelData),
    });
    if (!response.ok) {
      throw new Error(`Error creating model: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating model:', error);
    throw error;
  }
};

// Update a model by ID
export const updateModel = async (id, updatedModelData) => {
  try {
    const response = await fetch(`${MODEL_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedModelData),
    });
    if (!response.ok) {
      throw new Error(`Error updating model with ID ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating model with ID ${id}:`, error);
    throw error;
  }
};

// Delete a model by ID
export const deleteModel = async (id) => {
  try {
    const response = await fetch(`${MODEL_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting model with ID ${id}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting model with ID ${id}:`, error);
    throw error;
  }
};
