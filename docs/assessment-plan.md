# Next.js React Assessment - Implementation Plan

## Assessment Overview

Build a **messaging/comment system** with replies, voting, and real-time updates in 3 hours.

## Key Requirements

### Technical Stack (Mandatory)

* ✅ **Next.js** (preferred over React)
* ✅ **Tailwind CSS** (must use)
* ✅ **Redux** for state management (must use)
* ✅ **React Hook Forms** for form validation (mandatory)
* ✅ **Functional components only** (no class components)

### Core Features

#### 1\. Message System

* Users can send messages
* Messages save to Redux state
* Real-time UI updates when new messages are added
* Random user profile images from https://randomuser.me/

#### 2\. Reply System

* Users can reply to messages
* Replies should be properly indented under parent messages
* Nested conversation structure

#### 3\. Voting System

* Upvote and downvote functionality for comments
* Vote counts should update in real-time

#### 4\. Form Validation

* Mandatory form validation using react-hook-forms
* Input validation for message content

### Deployment

* Deploy to a free PaaS (Vercel recommended for Next.js)
* Provide both deployed URL and zipped codebase

## Implementation Plan

### Phase 1: Project Setup (15-20 mins)

1. Create Next.js project with TypeScript
2. Install dependencies:

   * Redux Toolkit
   * React Hook Forms
   * Tailwind CSS
   * Axios (for API calls)

3. Set up basic folder structure:

```
   src/
   ├── components/
   ├── store/
   ├── types/
   ├── utils/
   └── pages/
   ```

### Phase 2: State Management (30-40 mins)

1. Set up Redux store with RTK
2. Create slices for:

   * Messages
   * Users
   * UI state

3. Define data structure for nested comments
4. Implement actions for:

   * Adding messages
   * Adding replies
   * Voting (upvote/downvote)

### Phase 3: Core Components (60-80 mins)

1. **MessageForm Component**

   * Input form with validation
   * Submit handler
   * Integration with Redux

2. **Message Component**

   * Display message content
   * Show author info with avatar
   * Voting buttons
   * Reply button

3. **Reply Component**

   * Nested reply form
   * Proper indentation styling
   * Recursive rendering for nested replies

4. **MessageList Component**

   * Display all messages
   * Handle message sorting
   * Real-time updates

### Phase 4: Integration \& Styling (40-50 mins)

1. Integrate random user API (randomuser.me)
2. Apply Tailwind styling to match UI mockup
3. Implement proper indentation for replies
4. Add responsive design
5. Polish UI/UX

### Phase 5: Deployment (15-20 mins)

1. Deploy to Vercel
2. Test all functionality
3. Prepare codebase zip file

## Data Structure

```typescript
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  votes: number;
  userVote?: "up" | "down" | null;
  replies: Message\[];
  parentId?: string;
}

interface AppState {
  messages: Message\[];
  users: User\[];
  currentUser: User;
  loading: boolean;
  error: string | null;
}
```

## Required Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-hook-form": "^7.0.0",
    "tailwindcss": "^3.0.0",
    "axios": "^1.0.0",
    "uuid": "^9.0.0",
    "@types/uuid": "^9.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

## Key Implementation Notes

### Redux Store Structure

* Use Redux Toolkit for simplified store setup
* Implement normalized state for efficient updates
* Use createSlice for reducers and actions

### Component Architecture

* Keep components small and focused
* Use custom hooks for logic reuse
* Implement proper TypeScript types

### Styling Strategy

* Use Tailwind utility classes
* Create responsive design
* Implement proper indentation for nested replies
* Follow modern UI patterns

### Form Validation

* Use react-hook-form for performance
* Implement real-time validation
* Show user-friendly error messages

### API Integration

* Fetch random users on app load
* Cache user data in Redux
* Handle loading and error states

## Testing Checklist

* \[ ] Messages can be added and display immediately
* \[ ] Form validation works correctly
* \[ ] Replies are properly indented
* \[ ] Voting system updates counts
* \[ ] Random user avatars load
* \[ ] Responsive design works on mobile
* \[ ] Application deployed successfully
* \[ ] All Redux state updates correctly

## Deployment Steps

1. Build the application: `npm run build`
2. Test locally: `npm run start`
3. Push to GitHub repository
4. Connect Vercel to GitHub repo
5. Deploy and test live version
6. Create zip file of codebase

## Time Management Tips

* Start with basic functionality first
* Don't spend too much time on styling initially
* Test features as you build them
* Keep deployment simple (use Vercel's GitHub integration)
* Leave buffer time for debugging and polish
