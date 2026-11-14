
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/profileApi";
import "./MyProfile.css";

const UpdateProfile = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getProfile();

                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);

            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }

        };

        loadProfile();

    }, []);

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await updateProfile({
                name,
                phone
            });

            alert("Profile updated successfully");

            navigate("/profile");

        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    return (

        <div className="profile-container">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">
                        {name?.charAt(0).toUpperCase()}
                    </div>

                    <h3>Update Profile</h3>
                    <p>Edit your personal information</p>

                </div>

                <form onSubmit={handleUpdate}>

                    <div className="profile-field">
                        <label>Full Name</label>

                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="profile-field">
                        <label>Email Address</label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            disabled
                        />
                    </div>

                    <div className="profile-field">
                        <label>Phone Number</label>

                        <input
                            type="tel"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="profile-buttons">

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UpdateProfile;
