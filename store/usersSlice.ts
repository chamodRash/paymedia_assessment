// Redux slice for managing users state
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState } from "../types";

// Initial state for users
const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

// Create users slice with reducers
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Set loading state when fetching users
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set users array when data is loaded
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set current user (the one who is posting messages)
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    // Set error if something goes wrong
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear error state
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions to use in components
export const { setLoading, setUsers, setCurrentUser, setError, clearError } =
  usersSlice.actions;

// Export reducer to add to store
export default usersSlice.reducer;
