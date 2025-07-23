"use client";

// Redux Provider component to wrap the entire app
import React from "react";
import { Provider } from "react-redux";
import { store } from "./index";

interface ReduxProviderProps {
  children: React.ReactNode;
}

// This component wraps the app to provide Redux store to all components
export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
