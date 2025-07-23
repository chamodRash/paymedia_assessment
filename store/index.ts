// Configure and create Redux store
import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import usersReducer from "./usersSlice";

// Create Redux store with all reducers
export const store = configureStore({
  reducer: {
    messages: messagesReducer, // Handle messages state
    users: usersReducer, // Handle users state
  },

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",

  // Middleware configuration (RTK includes thunk by default)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure serialization options
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
