// File: /src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./auth"; // Make sure this path is correct

const store = configureStore({
  reducer: { 
    auth: authReduce 
  },
});

// VERY IMPORTANT: This line MUST exist and be correct.
// It makes the `store` variable the "default" thing that this file exports.
export default store; 