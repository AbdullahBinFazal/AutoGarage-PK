import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Side: Logo & Details */}
        <div className="footer-left">
          <div className="footer-brand">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0qsZ7flT4EABZ9eiYNKJQOsrhM91jPN8qGBa04WjeA&s=10" alt="AutoGarage Logo" className="footer-logo" />
            <h2>AutoGarage PK</h2>
          </div>
          <p className="footer-desc">
            Data-driven price predictions for the Pakistani used car market. 
          </p>
          <p className="footer-copyright">
            © 2026 AutoGarage PK.
          </p>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="footer-right">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/predict">Predict Price</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}