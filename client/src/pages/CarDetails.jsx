import React, { useEffect, useState } from 'react';
import { getCar, deleteCar } from '../services/CarsAPI';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const navigate = useNavigate(); // For redirecting after deletion

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [id]);

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
    <div>
      <h1>Car Details</h1>
      <p><strong>Model:</strong> {car.modelname}</p>
      <p><strong>Color:</strong> {car.colorname}</p>
      <p><strong>Engine Type:</strong> {car.enginename}</p>
      <p><strong>Interior:</strong> {car.interiortype}</p>
      <p><strong>Total Price:</strong> ${car.totalprice}</p>

      {/* Add Delete Button */}
      <button onClick={handleDelete}>Delete Car</button>
    </div>
  );
};

export default CarDetails;
