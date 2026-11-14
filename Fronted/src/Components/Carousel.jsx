
import "./Carousel.css";

import dellImage from "../assets/dell.png";

const Carousel = () => {
  return (
    <div
      id="laptopCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#laptopCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>

        <button
          type="button"
          data-bs-target="#laptopCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>

        <button
          type="button"
          data-bs-target="#laptopCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img
            src={dellImage}
            className="laptop-carousel-img"
            alt="Dell Laptop"
          />

          <div className="carousel-caption">
            <div className="carousel-content">
              <p className="offer-text">LIMITED TIME OFFER</p>

              <h1>Powerful Laptops</h1>

              <p>
                Upgrade your work and entertainment experience
                with our latest laptops.
              </p>

              <button className="shop-btn">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            src={dellImage}
            className="laptop-carousel-img"
            alt="Latest Laptop"
          />

          <div className="carousel-caption">
            <div className="carousel-content">
              <p className="offer-text">NEW ARRIVALS</p>

              <h1>Latest Laptops</h1>

              <p>
                Discover powerful laptops for students,
                professionals and gamers.
              </p>

              <button className="shop-btn">
                Explore Now
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src={dellImage}
            className="laptop-carousel-img"
            alt="Laptop Deals"
          />

          <div className="carousel-caption">
            <div className="carousel-content">
              <p className="offer-text">BEST DEALS</p>

              <h1>Get More. Pay Less.</h1>

              <p>
                Find the perfect laptop at an amazing price.
              </p>

              <button className="shop-btn">
                View Deals
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Previous Button */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#laptopCarousel"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>

        <span className="visually-hidden">
          Previous
        </span>
      </button>

      {/* Next Button */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#laptopCarousel"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>

        <span className="visually-hidden">
          Next
        </span>
      </button>
    </div>
  );
};

export default Carousel;

