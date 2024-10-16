import React, { useEffect, useState } from 'react';
import { getAllCars, deleteCar } from '../services/CarsAPI';
import { Link, useNavigate } from 'react-router-dom';

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // For redirection after delete

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      alert('Car deleted successfully');
      setCars(cars.filter(car => car.id !== id)); // Remove deleted car from the list
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete the car.');
    }
  };

  return (
    <div className="view-cars-container">
      <h1>View All Custom Cars</h1>
      <div className="cars-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-item">
              <p><strong>Model:</strong> {car.modelname}</p>
              <p><strong>Color:</strong> {car.colorname}</p>
              <p><strong>Engine Type:</strong> {car.enginename}</p>
              <p><strong>Interior:</strong> {car.interiortype}</p>
              <p><strong>Total Price:</strong> ${car.totalprice}</p>

              <Link to={`/customcars/${car.id}`}>View Details</Link> |{' '}
              <Link to={`/edit/${car.id}`}>Edit</Link> |{' '}
              {/* Add Delete Button */}
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewCars;
