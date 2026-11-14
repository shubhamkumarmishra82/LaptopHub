
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, changePassword } from "../api/profileApi";
import "./MyProfile.css";

const MyProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();

    }, []);

    const handlePasswordChange = async (e) => {

        e.preventDefault();

        if (newPassword.length < 6) {
            alert("New password must be at least 6 characters");
            return;
        }

        try {

            const message = await changePassword({
                oldPassword,
                newPassword
            });

            alert(message);

            setOldPassword("");
            setNewPassword("");
            setShowPassword(false);

        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading Profile...</h4>;
    }

    if (!profile) {
        return <h4 className="text-center mt-5">Profile not found</h4>;
    }

    return (

        <div className="profile-container">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">
                        {profile.name?.charAt(0).toUpperCase()}
                    </div>

                    <h3>My Profile</h3>
                    <p>Manage your personal information</p>

                </div>

                <div className="profile-field">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.name}
                        disabled
                    />
                </div>

                <div className="profile-field">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={profile.email}
                        disabled
                    />
                </div>

                <div className="profile-field">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={profile.phone}
                        disabled
                    />
                </div>

                <div className="profile-field">
                    <label>Role</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.role}
                        disabled
                    />
                </div>

                <div className="profile-buttons">

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/update-profile")}
                    >
                        Update Profile
                    </button>

                </div>

                <hr />

                <div className="password-section">

                    <h5>Change Password</h5>

                    {!showPassword ? (

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setShowPassword(true)}
                        >
                            Change Password
                        </button>

                    ) : (

                        <form onSubmit={handlePasswordChange}>

                            <div className="profile-field">
                                <label>Old Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="profile-field">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    minLength={6}
                                    required
                                />
                            </div>

                            <div className="profile-buttons">

                                <button type="submit" className="btn btn-success">
                                    Update Password
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setOldPassword("");
                                        setNewPassword("");
                                        setShowPassword(false);
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    )}

                </div>

                <div className="text-center mt-4">

                    <button
                        className="btn btn-dark"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
};

export default MyProfile;
