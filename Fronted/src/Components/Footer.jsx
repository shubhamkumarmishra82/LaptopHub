
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {

    const { token } = useSelector(state => state.auth);

  
    const phoneNumber = "918285110736";
    const whatsappNumber = "918285110736";
    const email = "shubham9801033836@gmail.com";

    return (

        <footer className="footer">

            <div className="container">

                <div className="row g-4">

                    {/* LaptopHub */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="footer-brand">

                            <h3>💻 LaptopHub</h3>

                            <p>
                                Find the perfect laptop for work, study,
                                gaming and entertainment at the best prices.
                            </p>

                            <p className="footer-developer">
                                Developed by <strong>Shubham Mishra</strong>
                            </p>

                        </div>

                    </div>


                    {/* Quick Links */}
                    <div className="col-6 col-md-3 col-lg-2">

                        <h5 className="footer-title">
                            Quick Links
                        </h5>

                        <ul className="footer-links">

                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/laptops">Laptops</Link></li>
                            <li><Link to="/aboutus">AboutUs</Link></li>
                           

                        </ul>

                    </div>
                    {/* My Account */}
                    <div className="col-6 col-md-6 col-lg-2">

                        <h5 className="footer-title">
                            My Account
                        </h5>

                        <ul className="footer-links">

                            {!token ? (

                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </>

                            ) : (

                                <>
                                    <li><Link to="/profile">My Profile</Link></li>
                                    <li><Link to="/my-orders">My Orders</Link></li>
                                   
                                </>

                            )}

                        </ul>

                    </div>


                    {/* Contact Details */}
                    <div className="col-6 col-md-6 col-lg-3">

                        <h5 className="footer-title">
                            Contact Details
                        </h5>

                        <ul className="footer-links footer-contact">

                            <li>
                                <span>👤</span>
                                Shubham Mishra
                            </li>

                            <li>
                                <span>📞</span>
                                <a href={`tel:${phoneNumber}`}>
                                    {phoneNumber}
                                </a>
                            </li>

                            <li>
                                <span>💬</span>
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    WhatsApp
                                </a>
                            </li>

                            <li>
                                <span>✉️</span>
                                <a href={`mailto:${email}`}>
                                    {email}
                                </a>
                            </li>

                        </ul>

                    </div>

                </div>


                <hr className="footer-divider" />


                {/* Bottom */}
                <div className="footer-bottom">

                    <p>
                        © 2026 LaptopHub. All Rights Reserved.
                    </p>

                    <div className="footer-social">

                        <a href="#" aria-label="Facebook">Facebook</a>

                        <a href="#" aria-label="Instagram">Instagram</a>

                        <a href="#" aria-label="Twitter">Twitter</a>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
