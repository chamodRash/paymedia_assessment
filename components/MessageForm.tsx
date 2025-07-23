// Message Form Component - handles adding new messages and replies
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useCurrentUser } from "../store/hooks";
import { addMessage, addReply } from "../store/messagesSlice";
import { Button } from "./ui/button";

interface MessageFormProps {
  parentId?: string; // If provided, this is a reply form
  onCancel?: () => void; // Callback to cancel reply form
  placeholder?: string; // Custom placeholder text
}

interface FormData {
  content: string;
}

export default function MessageForm({
  parentId,
  onCancel,
  placeholder,
}: MessageFormProps) {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Setup react-hook-form with validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange", // Validate on change for real-time feedback
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    if (!currentUser || !data.content.trim()) return;

    setIsSubmitting(true);

    try {
      if (parentId) {
        // This is a reply
        dispatch(
          addReply({
            parentId,
            reply: {
              content: data.content.trim(),
              author: currentUser,
            },
          })
        );
      } else {
        // This is a new top-level message
        dispatch(
          addMessage({
            content: data.content.trim(),
            author: currentUser,
          })
        );
      }

      // Reset form after successful submission
      reset();

      // Close reply form if this was a reply
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key submission (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={`${parentId ? "ml-12 mt-3" : "w-full lg:w-2/3 mx-auto"}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start justify-between space-x-4">
        {/* Current user avatar */}
        {imageError ? (
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        ) : (
          <img
            src={currentUser?.avatar || "/default-avatar.png"}
            alt={currentUser?.name || "User"}
            width={32}
            height={32}
            className="rounded-full flex-shrink-0 w-8 h-8 object-cover"
            onError={() => setImageError(true)}
          />
        )}

        {/* Input area */}
        <div className="flex-1">
          <textarea
            {...register("content", {
              required: "Message content is required",
              minLength: {
                value: 1,
                message: "Message cannot be empty",
              },
              maxLength: {
                value: 1000,
                message: "Message is too long (max 1000 characters)",
              },
              validate: (value) => {
                if (!value.trim()) {
                  return "Message cannot be empty";
                }
                return true;
              },
            })}
            placeholder={placeholder || "Add a comment..."}
            onKeyDown={handleKeyDown}
            className={`text-zinc-900 font-medium w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.content ? "border-red-500" : "border-gray-300"
            } ${parentId ? "min-h-[80px]" : "min-h-[30px]"}`}
            disabled={isSubmitting}
          />

          {/* Error message */}
          {errors.content && (
            <p className="text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col-reverse items-center gap-y-2">
          {/* Cancel button (only for replies) */}
          {parentId && onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}>
              Cancel
            </Button>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}>
            {isSubmitting ? "Sending..." : "SEND"}
          </Button>
        </div>
      </form>
    </div>
  );
}
