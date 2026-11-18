import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="contact-page-container">
      
      {/* Page Title Section */}
      <div className="contact-header">
        {/* This inner div keeps the text unblurred */}
        <div className="contact-header-content">
          <h1>Contact Us</h1>
          <p>Get in touch with the AutoGarage PK team for any queries or feedback.</p>
        </div>
      </div>

      {/* Single Section Layout */}
      <section className="brand-section bg-light">
        <div className="section-content">
          
          {/* Left Side: Contact Card with Image */}
          <div className="brand-image-card contact-image-card">
            <div className="contact-card-header">
              <h3>Get In Touch</h3>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800" 
              alt="Contact Us" 
              className="contact-card-img"
            />
          </div>

          {/* Right Side: Contact Details Text */}
          <div className="brand-text-content">
            <h3>We'd Love To Hear From You!</h3>
            <p style={{ lineHeight: '1.8', fontSize: '18px', marginBottom: '30px' }}>
              Whether you have a question about how our machine learning model works, 
              need help navigating the price predictor, or just want to give us feedback 
              on the project, our team is ready to answer all your questions.
            </p>

            {/* Contact Details List */}
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="icon-wrapper"><Phone size={24} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+92 300 1234567</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="icon-wrapper"><Mail size={24} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>support@autogaragepk.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="icon-wrapper"><MapPin size={24} /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>AutoGarage, Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}