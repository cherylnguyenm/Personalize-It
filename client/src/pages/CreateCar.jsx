import React, { useState, useEffect } from 'react';
import { createCar } from '../services/CarsAPI';
import { useNavigate } from 'react-router-dom';
import { getAllColors } from '../services/ColorAPI';
import { getAllEngineTypes } from '../services/EngineTypeAPI';
import { getAllModels } from '../services/ModelAPI';
import { getAllInteriors } from '../services/InteriorAPI';
import { calculateTotalPrice } from '../utilities/calcprice';
import { validateFeatureCombination } from '../utilities/validateFeatures';
import '../css/CreateCar.css';

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
  const [activeCategory, setActiveCategory] = useState('model'); // Track active category (model, color, etc.)

  const navigate = useNavigate();

  useEffect(() => {
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

  // Handle feature selection and real-time price update
  const handleChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Recalculate the total price
    const totalPrice = calculateTotalPrice(updatedFormData, models, colors, engineTypes, interiors);

    // Update the formData and totalPrice
    setFormData({
      ...updatedFormData,
      totalPrice: totalPrice,
    });
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
      navigate('/customcars');  // Navigate to car listing page after creation
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div className="create-car-container">
      <h1>Create Your Custom Car</h1>

      {/* Feature selection buttons */}
      <div className="feature-buttons">
        <button onClick={() => setActiveCategory('model')} className={activeCategory === 'model' ? 'active' : ''}>
          Model
        </button>
        <button onClick={() => setActiveCategory('color')} className={activeCategory === 'color' ? 'active' : ''}>
          Color
        </button>
        <button onClick={() => setActiveCategory('engineType')} className={activeCategory === 'engineType' ? 'active' : ''}>
          Engine Type
        </button>
        <button onClick={() => setActiveCategory('interior')} className={activeCategory === 'interior' ? 'active' : ''}>
          Interior
        </button>
      </div>

      {/* Display forms based on active category */}
      {activeCategory === 'model' && (
        <div className="model-options">
          <h3>Select Model</h3>
          {models.map((model) => (
            <div key={model.id} className={`option ${formData.model === model.modelname ? 'selected' : ''}`}>
              <img src={model.image} alt={model.modelname} />
              <label>
                <input
                  type="radio"
                  name="model"
                  value={model.modelname}
                  checked={formData.model === model.modelname}
                  onChange={() => handleChange('model', model.modelname)}
                />
                {model.modelname} - ${model.price}
              </label>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'color' && (
        <div className="color-options">
          <h3>Select Color</h3>
          {colors.map((color) => (
            <div key={color.id} className={`option ${formData.color === color.colorname ? 'selected' : ''}`}>
              <img src={color.image} alt={color.colorname} />
              <label>
                <input
                  type="radio"
                  name="color"
                  value={color.colorname}
                  checked={formData.color === color.colorname}
                  onChange={() => handleChange('color', color.colorname)}
                />
                {color.colorname} - ${color.price}
              </label>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'engineType' && (
        <div className="engine-options">
          <h3>Select Engine Type</h3>
          {engineTypes.map((engine) => (
            <div key={engine.id} className={`option ${formData.engineType === engine.enginename ? 'selected' : ''}`}>
              <img src={engine.image} alt={engine.enginename} />
              <label>
                <input
                  type="radio"
                  name="engineType"
                  value={engine.enginename}
                  checked={formData.engineType === engine.enginename}
                  onChange={() => handleChange('engineType', engine.enginename)}
                />
                {engine.enginename} - ${engine.price}
              </label>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'interior' && (
        <div className="interior-options">
          <h3>Select Interior</h3>
          {interiors.map((interior) => (
            <div key={interior.id} className={`option ${formData.interior === interior.interiortype ? 'selected' : ''}`}>
              <img src={interior.image} alt={interior.interiortype} />
              <label>
                <input
                  type="radio"
                  name="interior"
                  value={interior.interiortype}
                  checked={formData.interior === interior.interiortype}
                  onChange={() => handleChange('interior', interior.interiortype)}
                />
                {interior.interiortype} - ${interior.price}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Display total price */}
      <h3>Total Price: ${formData.totalPrice.toFixed(2)}</h3>

      <button onClick={handleSubmit}>Create Car</button>
    </div>
  );
};

export default CreateCar;
