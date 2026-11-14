import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "./Admin.css";
const AdminDashboard = () => {
  return (
    <div className="admin-container">

      {/* Sidebar */}
      <AdminSidebar />


      {/* Main Content */}
      <div className="admin-main">

        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div className="admin-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
