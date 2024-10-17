import React, { useState, useEffect } from 'react';
import { getCar, updateCar } from '../services/CarsAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllColors } from '../services/ColorAPI';
import { getAllEngineTypes } from '../services/EngineTypeAPI';
import { getAllModels } from '../services/ModelAPI';
import { getAllInteriors } from '../services/InteriorAPI';
import { calculateTotalPrice } from '../utilities/calcprice';
import { validateFeatureCombination } from '../utilities/validateFeatures';
import '../css/EditCar.css'; // Add CSS styling

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCar(id);
        setFormData(carData);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

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

    fetchCar();
    fetchOptions();
  }, [id]);

  const handleChange = (e, selectedOption) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: selectedOption[e.target.name],
    };

    // Recalculate the total price
    const totalPrice = calculateTotalPrice(updatedFormData, models, colors, engineTypes, interiors);

    // Update the state with the new selection and total price
    setFormData({
      ...updatedFormData,
      totalPrice: totalPrice,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateFeatureCombination(formData);
    if (!isValid) {
      alert('The selected feature combination is not valid.');
      return;
    }

    try {
      await updateCar(id, formData);
      alert('Car updated successfully');
      navigate('/customcars');
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <div className="edit-car-container">
      <h1>Edit Your Car</h1>

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
                  onChange={() => handleChange("model", model)}
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
                  onChange={() => handleChange("color", color)}
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
                  onChange={() => handleChange("engineType", engine)}
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
                  onChange={() => handleChange("interior", interior)}
                />
                {interior.interiortype} - ${interior.price}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Display total price */}
      <h3>Total Price: ${Number(formData.totalPrice).toLocaleString()}</h3>

      <button onClick={handleSubmit}>Update Car</button>
    </div>
  );
};

export default EditCar;
