// Main Chat App Component - combines all parts
"use client";

import React from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useInitializeApp } from "../utils/initializeApp";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

export default function ChatApp() {
  // Initialize app with mock data
  useInitializeApp();

  return (
    <div className="min-h-screen h-screen grid grid-rows-[7%_1fr] overflow-y-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-10 w-full">
        <div className="max-w-2/3 flex items-center justify-between mx-auto px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Chat Discussion
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Join the conversation - share your thoughts and reply to others
            </p>
          </div>
          <Button variant="outline" size="icon" className="p-2">
            <Bell className="w-6 h-6 text-gray-500 hover:text-purple-600" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl min-h-[93vh] h-[93vh] mx-auto grid grid-rows-[auto_7%] my-20 py-8">
        {/* Messages container */}
        <div
          className="w-full rounded-lg shadow-sm overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <MessageList />
        </div>

        {/* New message form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-8 py-4 fixed bottom-0 left-0 right-0 z-20">
          <MessageForm />
        </div>
      </main>
    </div>
  );
}
