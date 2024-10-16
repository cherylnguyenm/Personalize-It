import React, { useState, useEffect } from 'react';
import { createCar } from '../services/CarsAPI';
import { useNavigate } from 'react-router-dom';
import { getAllColors } from '../services/ColorAPI';
import { getAllEngineTypes } from '../services/EngineTypeAPI';
import { getAllModels } from '../services/ModelAPI';
import { getAllInteriors } from '../services/InteriorAPI';
import { calculateTotalPrice } from '../utilities/calcprice';
import { validateFeatureCombination } from '../utilities/validateFeatures';

const CreateCar = () => {
  const [formData, setFormData] = useState({
    model: '',
    color: '',
    engineType: '',
    interior: '',
    totalPrice: 0,
  });

  const [colors, setColors] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [interiors, setInteriors] = useState([]);

  const navigate = useNavigate(); // For navigation after creation

  useEffect(() => {
    // Fetch options for colors, engine types, models, and interiors
    const fetchOptions = async () => {
      try {
        setColors(await getAllColors());
        setEngineTypes(await getAllEngineTypes());
        setModels(await getAllModels());
        setInteriors(await getAllInteriors());
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Recalculate total price on option change
    const totalPrice = calculateTotalPrice(formData, models, colors, engineTypes, interiors);
    setFormData((prevFormData) => ({ ...prevFormData, totalPrice }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the feature combination before submission
    const isValid = validateFeatureCombination(formData);
    if (!isValid) {
      alert('The selected feature combination is not valid.');
      return;
    }

    try {
      await createCar(formData);
      alert('Car created successfully');
      navigate('/customcars'); // Redirect to view cars page
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <h1>Create Your Custom Car</h1>
      <form onSubmit={handleSubmit}>
        <label>Model</label>
        <select name="model" value={formData.model} onChange={handleChange}>
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.modelname}>
              {model.modelname}
            </option>
          ))}
        </select>

        <label>Color</label>
        <select name="color" value={formData.color} onChange={handleChange}>
          <option value="">Select Color</option>
          {colors.map((color) => (
            <option key={color.id} value={color.colorname}>
              {color.colorname}
            </option>
          ))}
        </select>

        <label>Engine Type</label>
        <select name="engineType" value={formData.engineType} onChange={handleChange}>
          <option value="">Select Engine Type</option>
          {engineTypes.map((engine) => (
            <option key={engine.id} value={engine.enginename}>
              {engine.enginename}
            </option>
          ))}
        </select>

        <label>Interior</label>
        <select name="interior" value={formData.interior} onChange={handleChange}>
          <option value="">Select Interior</option>
          {interiors.map((interior) => (
            <option key={interior.id} value={interior.interiortype}>
              {interior.interiortype}
            </option>
          ))}
        </select>

        <label>Total Price</label>
        <input
          type="number"
          name="totalPrice"
          value={formData.totalprice}
          onChange={handleChange}
          readOnly // Make total price read-only since it is calculated dynamically
        />

        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
