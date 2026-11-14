const BASE_URL = "http://localhost:9090/api/admin";

export const getDashboardCounts = async () => {

    const response = await fetch(`${BASE_URL}/dashboard-counts`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard counts");
    }

    return await response.json();
};