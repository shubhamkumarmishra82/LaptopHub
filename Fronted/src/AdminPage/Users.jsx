import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/userAdminApi";
import "./Users.css";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, []);

    return (
        <div className="users-page">

            <div className="users-heading">
                <div>
                    <h2>Manage Users</h2>
                    <p>View all registered Laptop Hub users</p>
                </div>

                <div className="users-total">
                    Total Users: {users.length}
                </div>
            </div>

            {loading && <p>Loading users...</p>}

            {error && <p className="users-error">{error}</p>}

            {!loading && !error && users.length === 0 && (
                <div className="no-users">
                    No users found.
                </div>
            )}

            {!loading && !error && users.length > 0 && (

                <div className="users-table-wrapper">

                    <table className="users-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <span className="user-role">
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
};

export default Users;