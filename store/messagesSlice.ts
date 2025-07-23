// Redux slice for managing messages state
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessagesState } from "../types";
import { v4 as uuidv4 } from "uuid";

// Initial state for messages
const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};

// Helper function to find message by ID in nested structure
const findMessageById = (messages: Message[], id: string): Message | null => {
  for (const message of messages) {
    if (message.id === id) {
      return message;
    }
    // Search in replies recursively
    const found = findMessageById(message.replies, id);
    if (found) return found;
  }
  return null;
};

// Helper function to add reply to specific message
const addReplyToMessage = (
  messages: Message[],
  parentId: string,
  reply: Message
): Message[] => {
  return messages.map((message) => {
    if (message.id === parentId) {
      // Found parent, add reply to its replies array
      return {
        ...message,
        replies: [...message.replies, reply],
      };
    }
    // Check if parent is in this message's replies
    return {
      ...message,
      replies: addReplyToMessage(message.replies, parentId, reply),
    };
  });
};

// Helper function to update vote for specific message
const updateMessageVote = (
  messages: Message[],
  messageId: string,
  voteType: "up" | "down" | null
): Message[] => {
  return messages.map((message) => {
    if (message.id === messageId) {
      // Found the message to update
      const currentVote = message.userVote;
      let newVotes = message.votes;

      // Calculate new vote count based on previous and new vote
      if (currentVote === "up" && voteType !== "up") {
        newVotes--; // Remove previous upvote
      }
      if (currentVote === "down" && voteType !== "down") {
        newVotes++; // Remove previous downvote
      }
      if (voteType === "up" && currentVote !== "up") {
        newVotes++; // Add new upvote
      }
      if (voteType === "down" && currentVote !== "down") {
        newVotes--; // Add new downvote
      }

      return {
        ...message,
        votes: newVotes,
        userVote: voteType,
      };
    }
    // Update votes in replies recursively
    return {
      ...message,
      replies: updateMessageVote(message.replies, messageId, voteType),
    };
  });
};

// Create messages slice with reducers
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Add new top-level message
    addMessage: (
      state,
      action: PayloadAction<
        Omit<Message, "id" | "timestamp" | "votes" | "replies">
      >
    ) => {
      const newMessage: Message = {
        ...action.payload,
        id: uuidv4(), // Generate unique ID
        timestamp: new Date().toISOString(), // Current timestamp
        votes: 0, // Start with 0 votes
        replies: [], // Empty replies array
        userVote: null, // No vote initially
      };

      // Add to beginning of messages array (newest first)
      state.messages.unshift(newMessage);
    },

    // Add reply to existing message
    addReply: (
      state,
      action: PayloadAction<{
        parentId: string;
        reply: Omit<
          Message,
          "id" | "timestamp" | "votes" | "replies" | "parentId"
        >;
      }>
    ) => {
      const { parentId, reply } = action.payload;

      const newReply: Message = {
        ...reply,
        id: uuidv4(), // Generate unique ID
        timestamp: new Date().toISOString(), // Current timestamp
        votes: 0, // Start with 0 votes
        replies: [], // Empty replies array
        parentId, // Set parent ID
        userVote: null, // No vote initially
      };

      // Add reply to the correct parent message
      state.messages = addReplyToMessage(state.messages, parentId, newReply);
    },

    // Handle voting on messages
    voteMessage: (
      state,
      action: PayloadAction<{
        messageId: string;
        voteType: "up" | "down" | null; // null means remove vote
      }>
    ) => {
      const { messageId, voteType } = action.payload;

      // Update vote for the specific message
      state.messages = updateMessageVote(state.messages, messageId, voteType);
    },

    // Set error state
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear error state
    clearError: (state) => {
      state.error = null;
    },

    // Clear all messages (for testing)
    clearMessages: (state) => {
      state.messages = [];
    },

    // Set initial messages (for development with sample data)
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

// Export actions to use in components
export const {
  setLoading,
  addMessage,
  addReply,
  voteMessage,
  setError,
  clearError,
  clearMessages,
  setMessages,
} = messagesSlice.actions;

// Export reducer to add to store
export default messagesSlice.reducer;
