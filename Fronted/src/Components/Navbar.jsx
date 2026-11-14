
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/loginSlice";
import { setCartCount } from "../store/cartSlice";
import { getCartItems } from "../api/cartApi";
import { getProductsByBrand ,searchProducts} from "../api/productApi";
import { setProducts } from "../store/ProductSlice";

import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, role, token } = useSelector(state => state.auth);
  const { cartCount } = useSelector(state => state.cart);
     const [searchKeyword, setSearchKeyword] = useState("");

  // Get email/name safely from user
  let userData = user;

  if (typeof user === "string") {
    try {
      userData = JSON.parse(user);
    } catch {
      userData = user;
    }
  }

  const userEmail =
    typeof userData === "string"
      ? userData
      : userData?.email || userData?.name || "My Account";

  const isLoggedIn = !!token;

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // Logout
  const handleOnLogout = () => {
    dispatch(logout());
    dispatch(setCartCount(0));
    closeMenu();
    navigate("/");
  };

  // Load Cart Count
  useEffect(() => {

    const loadCart = async () => {

      if (!token) {
        dispatch(setCartCount(0));
        return;
      }

      try {

        const data = await getCartItems();

        const totalQuantity = data.reduce(
          (total, item) => total + Number(item.quantity || 0),
          0
        );

        dispatch(setCartCount(totalQuantity));

      } catch (error) {
        console.log("Cart fetch error:", error);
      }
    };

    loadCart();

  }, [token, dispatch]);

  // Brand Filter
  const handleBrand = async (brand) => {

    try {

      const data = await getProductsByBrand(brand);

      dispatch(setProducts(data));

      navigate("/laptops" , {
        state : {filtered : true}
      });
      closeMenu();

    } catch (error) {
      alert(error.message);
    }
  };
   const handleSearch = async (e) => {

        e.preventDefault();

        const keyword = searchKeyword.trim();

        if (!keyword) {
            alert("Please enter laptop name or brand");
            return;
        }

        try {
            const data = await searchProducts(keyword);

            dispatch(setProducts(data));

            navigate("/laptops" , {
              state : {filtered : true}
            });
            setSearchKeyword("");
            closeMenu();

        } catch (error) {
            alert(error.message);
        }
    };


  return (

    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          💻 LaptopHub
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>

        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/laptops" onClick={closeMenu}>
          Laptops
        </NavLink>

        {/* Brands Dropdown */}
        <div className="dropdown">

          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Brands
          </button>

          <ul className="dropdown-menu">

            <li>
              <button className="dropdown-item" onClick={() => handleBrand("Dell")}>
                Dell
              </button>
            </li>

            <li>
              <button className="dropdown-item" onClick={() => handleBrand("HP")}>
                HP
              </button>
            </li>

            <li>
              <button className="dropdown-item" onClick={() => handleBrand("Asus")}>
                Asus
              </button>
            </li>

            <li>
              <button className="dropdown-item" onClick={() => handleBrand("Acer")}>
                Acer
              </button>
            </li>

            <li>
              <button className="dropdown-item" onClick={() => handleBrand("Macbook")}>
                Macbook
              </button>
            </li>

          </ul>

        </div>

        <NavLink to="/aboutus" onClick={closeMenu}>
          AboutUs
        </NavLink>

        {/* Mobile Search */}
         <form className="mobile-search" onSubmit={handleSearch}>

                    <input
                        type="text"
                        placeholder="Search laptops..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />

                    <button type="submit">
                        🔍
                    </button>

                </form>

        {/* Mobile Auth - Only when logged out */}
        {!isLoggedIn && (
          <div className="mobile-auth">

            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" className="register-btn" onClick={closeMenu}>
              Register
            </Link>

          </div>
        )}

      </div>

      {/* Right Section */}
      <div className="nav-right">

        {/* Desktop Search */}
        <div className="search-box">
            <form className="search-box" onSubmit={handleSearch}>

                    <input
                        type="text"
                        placeholder="Search laptops..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />

                    <button type="submit">
                        🔍
                    </button>

                </form>
        </div>

        {/* Cart */}
        <Link to="/cart" className="cart" onClick={closeMenu}>
          🛒 Cart
          <span className="cart-count">{cartCount}</span>
        </Link>

        {/* Logged In User */}
        {isLoggedIn && role === "USER" ? (

          <div className="user-dropdown">

            <button
              className="email-icon mx-3"
              onClick={() => setProfileOpen(!profileOpen)}
              title={userEmail}
              type="button"
            >
              ✉️
            </button>

            {profileOpen && (

              <div className="user-dropdown-menu">

                <div className="user-email">
                  {userEmail}
                </div>

                <hr />

                <Link
                  to="/profile"
                  onClick={closeMenu}
                >
                  👤 My Profile
                </Link>

                <Link
                  to="/my-orders"
                  onClick={closeMenu}
                >
                  📦 My Orders
                </Link>
                 <Link
                  to="/myreview"
                  onClick={closeMenu}
                >
                  📦 My Review
                </Link>

                <button onClick={handleOnLogout}>
                  🚪 Logout
                </button>

              </div>

            )}

          </div>

        ) : (

          // Login/Register only when logged out
          !isLoggedIn && (
            <div className="auth-buttons">

              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>

            </div>
          )

        )}

      </div>

      {/* Hamburger */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

    </nav>
  );
}

export default Navbar;
