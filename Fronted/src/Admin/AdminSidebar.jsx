import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/loginSlice";

const AdminSidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <h3>💻 Laptop Hub</h3>
        <p>Admin Panel</p>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>🏠</span>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard/products"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>📦</span>
            Products
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard/orders"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>🛒</span>
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>👥</span>
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard/reviews"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>⭐</span>
            Reviews
          </NavLink>
        </li>

      </ul>

      {/* Logout */}
      <div className="sidebar-logout">
        <button onClick={handleLogout}>
          <span>🚪</span>
          Logout
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;
