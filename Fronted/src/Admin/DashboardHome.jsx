import  { useEffect, useState } from "react";
import "./DashboardHome.css";
import { getDashboardCounts } from "../api/adminApi";

const DashboardHome = () => {

  const [counts, setCounts] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCounts = async () => {
      try {
        const data = await getDashboardCounts();
        setCounts(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();

  }, []);

  const dashboardCards = [
    {
      title: "Total Products",
      value: counts.totalProducts,
      icon: "💻",
      color: "#e8f0ff"
    },
    {
      title: "Total Orders",
      value: counts.totalOrders,
      icon: "📦",
      color: "#e6f9ef"
    },
    {
      title: "Total Users",
      value: counts.totalUsers,
      icon: "👥",
      color: "#fff3df"
    },
    {
      title: "Total Reviews",
      value: "180",
      icon: "⭐",
      color: "#f4eaff"
    }
  ];

  return (
    <div className="dashboard-home">

      <div className="dashboard-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome to Laptop Hub Admin Panel</p>
        </div>

        <span className="dashboard-date">
          📅 Admin Dashboard
        </span>
      </div>

      <div className="dashboard-cards">

        {dashboardCards.map((card, index) => (
          <div className="dashboard-card" key={index}>

            <div
              className="dashboard-card-icon"
              style={{ backgroundColor: card.color }}
            >
              {card.icon}
            </div>

            <div>
              <p>{card.title}</p>

              <h3>
                {loading  ? "..." : card.value}
              </h3>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DashboardHome;