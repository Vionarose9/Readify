import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        role: "user", // Default role
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            // When logging in, we get the role from the API response payload
            if (action.payload) {
                state.role = action.payload.role;
            }
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = "user"; // Reset role on logout
        },
        // --- ACTION FROM THE SCREENSHOT ---
        // This is used only to restore the role from localStorage
        changeRole(state, action) {
            const role = action.payload;
            state.role = role;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;