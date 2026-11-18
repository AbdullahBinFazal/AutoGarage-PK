export default function About() {
  const brandsInfo = [
    {
      name: 'Toyota',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrGNpRdb8KzG7MqohfgUyqIhue3AEwgOmW45_OB7h6Mg&s',
      title: 'The Undisputed King of Reliability',
      text: 'Established in 1937, Toyota entered Pakistan in 1993 through Toyota Indus Motor Company (IMC). It has dominated the market for decades. Toyota is famous for its unparalleled resale value and bulletproof reliability. Popular models in Pakistan include the Corolla, Yaris, Fortuner, and the iconic Hilux. Whether you want a family sedan or an off-roader, Toyota has a stronghold in every segment.',
      align: 'left'
    },
    {
      name: 'Honda',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      title: 'The Power of Dreams',
      text: 'Founded in 1948, Honda is represented in Pakistan by Honda Atlas Cars. Known for its engineering excellence and sporty driving dynamics, Honda is the go-to brand for those who love to drive. The Honda Civic is considered the premium sedan in Pakistan, while the City is a popular choice for middle-class families. Honda is also the undisputed leader in the motorcycle market in Pakistan.',
      align: 'right'
    },
    {
      name: 'Suzuki',
      img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      title: 'The People\'s Champion',
      text: 'Suzuki Motor Corporation was founded in 1909, making it one of the oldest. In Pakistan, Pak Suzuki Motor Company has been operating since 1982. Suzuki revolutionized local commuting with the Mehran (now discontinued) and currently dominates with the Alto, Cultus, and WagonR. It is the most affordable brand, known for excellent fuel economy and cheap spare parts, making it the backbone of Pakistani daily transport.',
      align: 'left'
    },
    {
      name: 'KIA',
      img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=800',
      title: 'The Modern Disruptor',
      text: 'KIA Motors was founded in 1944 in South Korea. KIA re-entered the Pakistani market recently through Lucky Motor Corporation and completely disrupted the industry. They introduced modern design and features that were previously unavailable at their price point. The KIA Sportage became an instant hit in the SUV segment, and the Picanto and Stonic offer great value for city driving.',
      align: 'right'
    },
    {
      name: 'Hyundai',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUEKnXXguIzIvKPv78A3Q-FVpuPI_dT4MUofQ664doQ&s=10',
      title: 'The Global Giant',
      text: 'Hyundai Motor Company was founded in 1967 and is part of the massive Hyundai Motor Group. In Pakistan, Hyundai is making a strong comeback via Hyundai Nishat Motor. Hyundai is pushing the boundaries of technology in Pakistan, introducing hybrid technology with the Ioniq and offering robust SUVs like the Tucson. They are positioning themselves as a futuristic and tech-forward alternative to traditional brands.',
      align: 'left'
    }
  ];

  return (
    <div className="about-page-container">
      
           {/* Page Title Section */}
      <div className="about-header">
        {/* This inner div keeps the text unblurred and on top */}
        <div className="about-header-content">
          <h1>About The Brands</h1>
          <p>Learn about the history and legacy of the top automotive companies in Pakistan.</p>
        </div>
      </div>
      {/* Alternating Brand Sections */}
      <div className="brands-wrapper">
        {brandsInfo.map((brand, index) => {
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

                {/* Text Content (No Button) */}
                <div className="brand-text-content">
                  <h3>{brand.title}</h3>
                  <p style={{ lineHeight: '1.8', fontSize: '16px' }}>{brand.text}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}