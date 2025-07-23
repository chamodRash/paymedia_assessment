// Message Component - displays individual messages with replies
"use client";

import React, { useState } from "react";
import { Message as MessageType } from "../types";
import Voting from "./Voting";
import MessageForm from "./MessageForm";
import RealTimeTimestamp from "./RealTimeTimestamp";
import { Button } from "./ui/button";
import { Reply } from "lucide-react";

interface MessageProps {
  message: MessageType;
  depth?: number; // Track nesting depth for indentation
}

export default function Message({ message, depth = 0 }: MessageProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true); // Show replies by default
  const [imageError, setImageError] = useState(false);

  // Use predefined Tailwind classes for reliable indentation
  const getIndentClass = (depth: number) => {
    const indentClasses = [
      "", // depth 0 - no indentation
      "ml-8 md:ml-12", // depth 1 - first level replies
      "ml-16 md:ml-24", // depth 2 - second level replies
      "ml-24 md:ml-36", // depth 3 - third level replies
      "ml-32 md:ml-48", // depth 4 - fourth level replies
      "ml-40 md:ml-60", // depth 5+ - maximum indentation
    ];

    return indentClasses[Math.min(depth, 5)] || indentClasses[5];
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle reply button click
  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  // Handle reply form cancel
  const handleReplyCancel = () => {
    setShowReplyForm(false);
  };

  // Toggle replies visibility
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div
      className={`${depth > 0 ? getIndentClass(depth) : ""} ${
        depth > 0 ? "mt-4" : "mb-6"
      } ${depth > 0 ? "border-l-2 border-gray-200 pl-4" : ""}`}>
      {/* Main message card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-8 flex gap-x-4 lg:gap-x-8">
        {/* Voting component */}
        <Voting
          messageId={message.id}
          votes={message.votes}
          userVote={message.userVote}
        />
        <div className="flex-1 flex flex-col gap-y-4">
          {/* Message header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              {/* User avatar */}
              <div className="flex-shrink-0">
                {imageError ? (
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {message.author.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img
                    src={message.author.avatar}
                    alt={message.author.name}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                    onError={handleImageError}
                  />
                )}
              </div>
              {/* Author name and timestamp */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2">
                <h4 className="font-bold text-gray-900">
                  {message.author.name}
                </h4>
                <RealTimeTimestamp
                  timestamp={message.timestamp}
                  className="text-xs font-bold text-gray-400"
                />
              </div>
            </div>
            {/* Reply button */}
            <Button
              onClick={handleReplyClick}
              variant="ghost"
              size="sm"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors">
              <Reply className="mr-4 h-4 w-4" />
              Reply
            </Button>
          </div>
          {/* Message content */}
          <div className="flex flex-col items-start gap-y-2">
            {/* Message text */}
            <p className="text-gray-500 leading-relaxed whitespace-pre-wrap font-medium">
              {message.content}
            </p>

            {/* Replies toggle (only if has replies) */}
            {message.replies.length > 0 && (
              <Button
                onClick={toggleReplies}
                variant="link"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                {showReplies ? "Hide" : "Show"} {message.replies.length} repl
                {message.replies.length === 1 ? "y" : "ies"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <MessageForm
          parentId={message.id}
          onCancel={handleReplyCancel}
          placeholder="Write a reply..."
        />
      )}

      {/* Nested replies */}
      {showReplies && message.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {message.replies.map((reply) => (
            <Message key={reply.id} message={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
