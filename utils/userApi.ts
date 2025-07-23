// Real user API integration with randomuser.me
import axios from "axios";
import { User } from "../types";

// Type for RandomUser API response
interface RandomUserResult {
  login: {
    uuid: string;
    username: string;
  };
  picture: {
    medium: string;
  };
}

// Fetch random users from randomuser.me API
export const fetchRandomUsers = async (count: number = 10): Promise<User[]> => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=${count}`
    );

    return response.data.results.map((user: RandomUserResult) => ({
      id: user.login.uuid,
      name: user.login.username, // Using username for more realistic usernames
      avatar: user.picture.medium,
    }));
  } catch (error) {
    console.error("Failed to fetch random users:", error);

    // Fallback to mock data if API fails
    const { mockUsers } = await import("./mockData");
    return mockUsers;
  }
};

// Fetch a single random user
export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=1");
    const user: RandomUserResult = response.data.results[0];

    return {
      id: user.login.uuid,
      name: user.login.username,
      avatar: user.picture.medium,
    };
  } catch (error) {
    console.error("Failed to fetch random user:", error);

    // Fallback to mock data
    const { getRandomUser } = await import("./mockData");
    return getRandomUser();
  }
};

// Cache for storing fetched users to avoid repeated API calls
let userCache: User[] = [];

// Get cached users or fetch new ones
export const getCachedUsers = async (): Promise<User[]> => {
  if (userCache.length === 0) {
    userCache = await fetchRandomUsers(20); // Fetch 20 users for variety
  }
  return userCache;
};

// Get a random user from cache
export const getRandomCachedUser = async (): Promise<User> => {
  const users = await getCachedUsers();
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
};
