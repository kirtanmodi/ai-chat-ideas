import React from "react";
import { Box, Typography } from "@mui/material";
import { FeedbackMechanism } from "./FeedbackMechanism";

interface ChatMessageProps {
  message: {
    id: string;
    type: "user" | "ai";
    content: string;
  };
  children: React.ReactNode;
  onFeedback: (messageId: string, isPositive: boolean) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, children, onFeedback }) => {
  const isUser = message.type === "user";
  return (
    <Box sx={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", mb: 2 }}>
      <Box
        sx={{
          maxWidth: { xs: "75%", sm: "50%" },
          p: 2,
          borderRadius: 2,
          bgcolor: isUser ? "primary.main" : "grey.200",
          color: isUser ? "primary.contrastText" : "text.primary",
        }}
      >
        <Typography component="div">{children}</Typography>
        {!isUser && <FeedbackMechanism messageId={message.id} onFeedback={onFeedback} />}
      </Box>
    </Box>
  );
};
