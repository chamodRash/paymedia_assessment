// Custom hooks for Redux with TypeScript
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Create typed hooks to use throughout the app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to get current user from Redux state
export const useCurrentUser = () => {
  return useAppSelector((state) => state.users.currentUser);
};

// Custom hook to get all messages from Redux state
export const useMessages = () => {
  return useAppSelector((state) => state.messages.messages);
};

// Custom hook to get all users from Redux state
export const useUsers = () => {
  return useAppSelector((state) => state.users.users);
};

// Custom hook to check if app is loading
export const useIsLoading = () => {
  const messagesLoading = useAppSelector((state) => state.messages.loading);
  const usersLoading = useAppSelector((state) => state.users.loading);
  return messagesLoading || usersLoading;
};

// Custom hook to get any errors
export const useErrors = () => {
  const messagesError = useAppSelector((state) => state.messages.error);
  const usersError = useAppSelector((state) => state.users.error);
  return {
    messagesError,
    usersError,
    hasError: Boolean(messagesError || usersError),
  };
};
