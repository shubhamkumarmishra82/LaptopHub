import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginValidates from "../util/loginValidates";
import { useDispatch } from "react-redux";
import { login } from "../store/loginSlice";
const UserLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const [error , setError] = useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const validateError = loginValidates(formData)
   setError(validateError)
   if(Object.keys(validateError).length !==0 ) return;
    try {
      const response = await fetch(
        "http://localhost:9090/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }
      const data = await response.json()
         dispatch(login(data));
        alert("Login Successfully");
        if (data.role === "ADMIN") {
            navigate("/admin/dashboard");
        } else if (data.role === "USER") {
            navigate("/");
        }

     
    } catch (err) {
      alert(err)
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
                    Login
                  </h2>
                </div>

             
                <form onSubmit={handleSubmit}>

                

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


                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                  >
                    Login
                  </button>

                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                  Back
                  </span>

                  <Link
                    to="/"
                    className="text-primary fw-semibold text-decoration-none ms-1"
                  >
                    Home
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

export default UserLogin;