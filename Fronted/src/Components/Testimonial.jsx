
import { useEffect, useState } from "react";
import { getApprovedReviews } from "../api/reviewApi";
import "./Testimonials.css";

const Testimonial = () => {

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTestimonials = async () => {
      try {
        const data = await getApprovedReviews();

        console.log("Approved Reviews:", data);

        setTestimonials(data);

      } catch (error) {
        console.error("Testimonials Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

  }, []);

  if (loading) {
    return (
      <section className="container py-5 text-center">
        Loading testimonials...
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">
          What Our Customers Say
        </h2>

        <p className="text-muted">
          Trusted by LaptopHub customers
        </p>
      </div>

      {/* Testimonials */}
      <div className="row g-4">

        {testimonials.map((testimonial) => (

          <div
            className="col-12 col-md-6 col-lg-4"
            key={testimonial.id}
          >

            <div className="testimonial-card h-100">

              {/* Rating */}
              <div className="testimonial-rating">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="testimonial-comment">
                "{testimonial.comment}"
              </p>

              {/* User */}
              <div className="testimonial-user">

                <div className="user-avatar">
                  {testimonial.userName?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h6 className="user-name">
                    {testimonial.userName}
                  </h6>

                  <span className="user-role">
                    ✓ LaptopHub Customer
                  </span>
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Testimonial;
