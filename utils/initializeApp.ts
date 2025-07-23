// Initialize app with real API data
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUsers, setCurrentUser, setLoading } from "../store/usersSlice";
import { setMessages } from "../store/messagesSlice";
import { getCachedUsers } from "./userApi";
import { sampleMessages, loadSampleData } from "./sampleMessages";

// Custom hook to initialize app data
export const useInitializeApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeData = async () => {
      try {
        dispatch(setLoading(true));

        // Fetch real users from API
        const realUsers = await getCachedUsers();
        dispatch(setUsers(realUsers));

        // Set current user (first user from API)
        if (realUsers.length > 0) {
          dispatch(setCurrentUser(realUsers[0]));
        }

        // Load sample messages if enabled (for development)
        if (loadSampleData) {
          // Update sample messages to use real users
          const updatedMessages = sampleMessages.map((message, index) => ({
            ...message,
            author: realUsers[index % realUsers.length] || realUsers[0],
          }));
          dispatch(setMessages(updatedMessages));
        }
      } catch (error) {
        console.error("Failed to initialize app:", error);

        // Fallback to mock data if everything fails
        const { mockUsers, getCurrentUser } = await import("./mockData");
        dispatch(setUsers(mockUsers));
        dispatch(setCurrentUser(getCurrentUser()));

        if (loadSampleData) {
          dispatch(setMessages(sampleMessages));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeData();
  }, [dispatch]);
};

// You can add more initialization logic here later for API integration
