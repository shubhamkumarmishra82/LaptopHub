
const BASE_URL = "http://localhost:9090/api/user/profile";

// GET PROFILE
export const getProfile = async () => {

    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to get profile");
    }

    return await response.json();
};


// UPDATE NAME AND PHONE
export const updateProfile = async (profileData) => {

    const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(profileData)
    });

    const message = await response.text();

    if (!response.ok) {
        throw new Error(message || "Profile update failed");
    }

    return message;
};


// CHANGE PASSWORD
export const changePassword = async (passwordData) => {

    const response = await fetch(`${BASE_URL}/password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(passwordData)
    });

    const message = await response.text();

    if (!response.ok) {
        throw new Error(message || "Password change failed");
    }

    return message;
};
