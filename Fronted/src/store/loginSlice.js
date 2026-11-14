import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "auth",

    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
        isLoggined: !!localStorage.getItem("token")
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isLoggined = true;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isLoggined = false;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

