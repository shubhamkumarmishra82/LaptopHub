import { useSelector } from "react-redux";

const AdminNavbar = () => {

    const { user, role } = useSelector((state) => state.auth);
    console.log(user + " " + role) 

    return (
      
        <div className="admin-navbar">

            <div className="admin-menu-icon">
                <button type="button">
                    ☰
                </button>
            </div>

            <div className="admin-profile">
                <span className="admin-email-icon">✉</span>

                 {
                  role ==="ADMIN" ? <span>{user}</span> : "Admin"
                 }
            </div>

        </div>
    );
};

export default AdminNavbar;