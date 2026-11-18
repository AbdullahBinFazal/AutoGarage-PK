import { Link } from 'react-router-dom';

export default function Home() {
  const brandsData = [
    {
      name: 'Toyota',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToVp6pb8PQ6Qjl9O00ypL8tlVkjsC20bzyP-EvHx9AMQ&s=10',
      text: 'Proceed to predict prices of Toyota vehicles',
      align: 'left' // Image on Left
    },
    {
      name: 'Honda',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      text: 'Proceed to predict prices of Honda vehicles',
      align: 'right' // Image on Right
    },
    {
      name: 'Suzuki',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7bUlr-bpG9yd3ltSFnLf94W07h2M5ZXR3RIsAJHmf-Q&s=10',
      text: 'Proceed to predict prices of Suzuki vehicles',
      align: 'left' // Image on Left
    },
    {
      name: 'KIA',
      img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=800',
      text: 'Proceed to predict prices of KIA vehicles',
      align: 'right' // Image on Right
    },
    {
      name: 'Hyundai',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIENsXwFvPyyW7VSTe7qOrIP44nipx34eqcR91og8kPQ&s=10',
      text: 'Proceed to predict prices of Hyundai vehicles',
      align: 'left' // Image on Left
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>Find the True Value of Your Car</h1>
          <p>Data-driven price predictions for the Pakistani used car market.</p>
        </div>
      </div>

      {/* Alternating Brand Sections */}
      <div className="brands-wrapper">
        {brandsData.map((brand, index) => {
          // Determine if the section is white or black (even = white, odd = black)
          const isDark = index % 2 !== 0; 
          
          return (
            <section 
              key={brand.name} 
              className={`brand-section ${isDark ? 'bg-dark' : 'bg-light'}`}
            >
              <div className="section-header">
                <h2>{brand.name}</h2>
              </div>

              <div className={`section-content ${brand.align === 'right' ? 'reverse-layout' : ''}`}>
                {/* Image Card */}
                <div className="brand-image-card">
                  <img src={brand.img} alt={brand.name} />
                </div>

                {/* Text & Button */}
                <div className="brand-text-content">
                  <h3>{brand.text}</h3>
                  <p>Get accurate market estimates based on real data and machine learning.</p>
                  <Link to={`/predict?brand=${brand.name}`} className="btn-predict">
                    Predict {brand.name} Price
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}