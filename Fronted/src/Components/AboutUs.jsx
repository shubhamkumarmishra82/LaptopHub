import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <div className="container text-center">
          <h1>About LaptopHub</h1>
          <p>
            Your trusted destination for finding the perfect laptop.
          </p>
        </div>
      </div>


      {/* About Content */}
      <div className="container py-5">

        <div className="row align-items-center g-5">

          <div className="col-12 col-lg-6">
            <div className="about-content">

              <span className="about-label">
                ABOUT US
              </span>

              <h2>
                Your One-Stop Destination for Laptops
              </h2>

              <p>
                LaptopHub is an online laptop shopping platform
                designed to make finding and purchasing the right
                laptop simple and convenient.
              </p>

              <p>
                Whether you are a student, professional, creator
                or gamer, LaptopHub helps you explore laptops from
                popular brands and choose a device that matches
                your needs and budget.
              </p>

              <p>
                We focus on providing a simple shopping experience,
                detailed product information and competitive prices.
              </p>

            </div>
          </div>


          <div className="col-12 col-lg-6">

            <div className="about-card">

              <div className="about-icon">
                💻
              </div>

              <h3>
                Why Choose LaptopHub?
              </h3>

              <div className="about-features">

                <div className="feature-item">
                  <span>✓</span>
                  <div>
                    <h5>Wide Range of Laptops</h5>
                    <p>
                      Explore laptops from popular brands.
                    </p>
                  </div>
                </div>


                <div className="feature-item">
                  <span>✓</span>
                  <div>
                    <h5>Competitive Prices</h5>
                    <p>
                      Find great laptops at attractive prices.
                    </p>
                  </div>
                </div>


                <div className="feature-item">
                  <span>✓</span>
                  <div>
                    <h5>Easy Shopping</h5>
                    <p>
                      Simple and user-friendly shopping experience.
                    </p>
                  </div>
                </div>


                <div className="feature-item">
                  <span>✓</span>
                  <div>
                    <h5>Secure Experience</h5>
                    <p>
                      Safe and reliable platform for customers.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Mission */}
        <div className="about-mission text-center">

          <span className="about-label">
            OUR MISSION
          </span>

          <h2>
            Making Laptop Shopping Simple
          </h2>

          <p>
            Our mission is to help customers discover the right
            laptop easily by providing useful product information,
            competitive pricing and a smooth online shopping experience.
          </p>

        </div>

      </div>

    </section>
  );
};

export default AboutUs;