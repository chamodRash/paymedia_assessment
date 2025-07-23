// Define all TypeScript interfaces for the application

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  content: string;
  author: User;
  timestamp: string; // Using string for easier serialization in Redux
  votes: number;
  userVote?: "up" | "down" | null; // Track current user's vote
  replies: Message[];
  parentId?: string; // For nested replies
}

// Root state interface for Redux store
export interface RootState {
  messages: MessagesState;
  users: UsersState;
}

// Messages slice state
export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

// Users slice state
export interface UsersState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}
