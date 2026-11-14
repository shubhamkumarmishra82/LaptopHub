const BASE_URL = "http://localhost:9090/api/admin";

export const getAllUsers = async () => {

    const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
};