import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import registerValidates from "../util/registerValidates";


const UserRegisterPage = () => {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateError = registerValidates(formData)
    setError(validateError)
    if(Object.keys(validateError).length !== 0) return;
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "http://localhost:9090/api/auth/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }
       alert("User Registered successfully");
     navigate("/login")
    } catch (err) {
      alert("something went wrong please try ");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="container">
        <div className="row justify-content-center align-items-center">

          <div className="col-lg-5 col-md-7 col-sm-10">

            <div className="card register-card shadow-lg border-0">

              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <h2 className="fw-bold">
                    Create Account
                  </h2>

                  <p className="text-muted">
                    Join LaptopHub and explore amazing laptops
                  </p>
                </div>

             
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      
                    />
                    {error.name && <p className="text-danger">{error.name}</p>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      
                    />
                    {error.email && <p className="text-danger">{error.email}</p>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      
                    />
                    {error.phone && <p className="text-danger">{error.phone}</p>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleChange}
                      minLength="8"
                      
                    />
                    {error.password && <p className="text-danger">{error.password}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      minLength="8"
                    
                    />
                    {error.confirmPassword && <p className="text-danger">{error.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                  >
                    Create Account
                  </button>

                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?
                  </span>

                  <Link
                    to="/login"
                    className="text-primary fw-semibold text-decoration-none ms-1"
                  >
                    Login
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegisterPage;