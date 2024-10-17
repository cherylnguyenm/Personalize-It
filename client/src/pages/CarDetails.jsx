import React, { useEffect, useState } from 'react';
import { getCar, deleteCar } from '../services/CarsAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { calculateTotalPrice } from '../utilities/calcprice';
import { getAllColors } from '../services/ColorAPI';
import { getAllEngineTypes } from '../services/EngineTypeAPI';
import { getAllModels } from '../services/ModelAPI';
import { getAllInteriors } from '../services/InteriorAPI';
import '../css/CarDetails.css'; 

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Store calculated total price
  const [colors, setColors] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [interiors, setInteriors] = useState([]);
  const navigate = useNavigate(); // For redirecting after deletion

  useEffect(() => {
    // Fetch all options (models, colors, engine types, interiors)
    const fetchOptions = async () => {
      try {
        const fetchedColors = await getAllColors();
        const fetchedEngineTypes = await getAllEngineTypes();
        const fetchedModels = await getAllModels();
        const fetchedInteriors = await getAllInteriors();

        setColors(fetchedColors);
        setEngineTypes(fetchedEngineTypes);
        setModels(fetchedModels);
        setInteriors(fetchedInteriors);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    // Fetch car details by ID
    const fetchCar = async () => {
      try {
        const data = await getCar(id);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchOptions();
    fetchCar();
  }, [id]);

  useEffect(() => {
    if (car && models.length > 0 && colors.length > 0 && engineTypes.length > 0 && interiors.length > 0) {
      // Calculate total price based on selected car features
      const price = calculateTotalPrice(car, models, colors, engineTypes, interiors);
      setTotalPrice(price);
    }
  }, [car, models, colors, engineTypes, interiors]);

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      alert('Car deleted successfully');
      navigate('/customcars'); // Redirect back to the list of cars
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete the car.');
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="car-details-container">
      <h1>Car Details</h1>
      <div className="car-details">
        <p><strong>Model:</strong> {car.modelname}</p>
        <p><strong>Color:</strong> {car.colorname}</p>
        <p><strong>Engine Type:</strong> {car.enginename}</p>
        <p><strong>Interior:</strong> {car.interiortype}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>

      {/* Add Delete Button */}
      <button onClick={handleDelete} className="delete-button">Delete Car</button>
    </div>
  );
};

export default CarDetails;
