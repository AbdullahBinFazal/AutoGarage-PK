import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0qsZ7flT4EABZ9eiYNKJQOsrhM91jPN8qGBa04WjeA&s=10" alt="AutoValue Logo" className="nav-logo" />
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/predict">Predict Price</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}