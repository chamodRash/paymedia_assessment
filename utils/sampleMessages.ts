// Sample messages to test UI components - matching the mockup exactly
import { Message } from "../types";
import { mockUsers } from "./mockData";

export const sampleMessages: Message[] = [
  {
    id: "1",
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    author: mockUsers[0], // amyrobson
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
    votes: 12,
    userVote: null,
    replies: [],
  },
  {
    id: "2",
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new but think I want to dip into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    author: mockUsers[1], // maxblagun
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    votes: 5,
    userVote: null,
    replies: [
      {
        id: "3",
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        author: mockUsers[2], // ramsesmiron
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        votes: 4,
        userVote: null,
        replies: [],
        parentId: "2",
      },
    ],
  },
  {
    id: "4",
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    author: mockUsers[3], // juliusomo (with PRO badge)
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    votes: 2,
    userVote: null,
    replies: [],
  },
];

// Function to load sample messages into Redux (for development/testing)
export const loadSampleData = true; // Set to false to start with empty messages
