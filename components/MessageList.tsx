// Message List Component - displays all top-level messages
"use client";

import React from "react";
import { useMessages } from "../store/hooks";
import Message from "./Message";
import { Message as MessageType } from "@/types";

export default function MessageList() {
  const messages = useMessages();

  // Show empty state if no messages
  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No messages yet</div>
        <div className="text-gray-400 text-sm">
          Be the first to start the conversation!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-6">
      {/* Render all top-level messages */}
      {messages.map((message: MessageType) => (
        <Message key={message.id} message={message} depth={0} />
      ))}
    </div>
  );
}
