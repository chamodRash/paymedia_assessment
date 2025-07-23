// Voting Component - handles upvote and downvote functionality
"use client";

import React from "react";
import { useAppDispatch } from "../store/hooks";
import { voteMessage } from "../store/messagesSlice";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface VotingProps {
  messageId: string;
  votes: number;
  userVote?: "up" | "down" | null;
}

export default function Voting({ messageId, votes, userVote }: VotingProps) {
  const dispatch = useAppDispatch();

  // Handle upvote click
  const handleUpvote = () => {
    const newVote = userVote === "up" ? null : "up"; // Toggle upvote or remove vote
    dispatch(voteMessage({ messageId, voteType: newVote }));
  };

  // Handle downvote click
  const handleDownvote = () => {
    const newVote = userVote === "down" ? null : "down"; // Toggle downvote or remove vote
    dispatch(voteMessage({ messageId, voteType: newVote }));
  };

  return (
    <div className="h-24 flex flex-col items-center justify-between bg-gray-100 rounded-md">
      {/* Upvote button */}
      <Button
        onClick={handleUpvote}
        className={
          userVote === "up"
            ? "text-purple-600"
            : "text-gray-500 hover:text-purple-600"
        }
        variant="ghost"
        size="icon"
        aria-label="Upvote">
        <Plus className="w-4 h-4" />
      </Button>

      {/* Vote count */}
      <span
        className={`text-sm font-semibold min-w-[20px] text-center ${
          votes > 0
            ? "text-purple-600"
            : votes < 0
            ? "text-red-600"
            : "text-gray-600"
        }`}>
        {votes}
      </span>

      {/* Downvote button */}
      <Button
        onClick={handleDownvote}
        className={
          userVote === "down"
            ? "text-red-600"
            : "text-gray-500 hover:text-red-600"
        }
        variant="ghost"
        size="icon"
        aria-label="Downvote">
        <Minus className="w-4 h-4" />
      </Button>
    </div>
  );
}
