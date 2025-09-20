import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        role: "user",
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            // This is the critical part. It checks if the login action
            // was called with data (the payload from your API) and
            // updates the role accordingly.
            if (action.payload) {
                state.role = action.payload.role;
            }
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = "user";
        },
        // This is used by App.jsx to restore the role on page refresh
        changeRole(state, action) {
            state.role = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;