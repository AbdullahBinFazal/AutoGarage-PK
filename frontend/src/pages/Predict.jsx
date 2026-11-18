import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Predict() {
  const location = useLocation();
  
  // Check if a brand was passed in the URL (e.g., /predict?brand=Toyota)
  const queryParams = new URLSearchParams(location.search);
  const initialBrand = queryParams.get('brand') || 'Toyota';

  const [formData, setFormData] = useState({
    brand: initialBrand,
    year: 2020,
    engine_cc: 1300,
    mileage_km: 50000,
    transmission: 'Manual',
    fuel_type: 'Petrol'
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.predicted_price);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend. Is the Python server running?");
    }
    setLoading(false);
  };

  return (
    <div className="predict-page-container">
      
      {/* PREDICT PAGE HERO SECTION */}
      <div className="predict-header">
        <div className="predict-header-content">
          <h1>Price Estimator</h1>
          <p>Fill in your car's details to get an instant, AI-powered market estimate.</p>
        </div>
      </div>

      {/* FORM SECTION */}
      <section className="brand-section bg-light">
        <div className="predict-form-wrapper">
          <form onSubmit={handleSubmit} className="premium-form">
            
            <div className="form-row">
              <div className="form-group">
                <label>Brand</label>
                <select name="brand" value={formData.brand} onChange={handleChange}>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="KIA">KIA</option>
                  <option value="Hyundai">Hyundai</option>
                </select>
              </div>

              <div className="form-group">
                <label>Year</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} min="1990" max="2026" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Engine (CC)</label>
                <input type="number" name="engine_cc" value={formData.engine_cc} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Mileage (KM)</label>
                <input type="number" name="mileage_km" value={formData.mileage_km} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fuel Type</label>
                <select name="fuel_type" value={formData.fuel_type} onChange={handleChange}>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Calculating...' : 'Predict Price'}
            </button>

          </form>

          {/* Prediction Result Box */}
          {prediction && (
            <div className="result-box">
              <h2>Estimated Market Value:</h2>
              <h1 className="price">PKR {prediction.toLocaleString()}</h1>
              <p className="disclaimer"></p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}