// Mock user data to use instead of API during development
import { User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "amyrobson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "maxblagun",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "ramsesmiron",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "juliusomo",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "5",
    name: "you",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

// Get current user (first user in mock data)
export const getCurrentUser = (): User => mockUsers[0];

// Get random user for new messages
export const getRandomUser = (): User => {
  const randomIndex = Math.floor(Math.random() * mockUsers.length);
  return mockUsers[randomIndex];
};
