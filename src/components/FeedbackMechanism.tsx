import React, { useState } from "react";
import { Box, IconButton, Tooltip, Snackbar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface FeedbackMechanismProps {
  messageId: string;
  onFeedback: (messageId: string, isPositive: boolean) => void;
}

export const FeedbackMechanism: React.FC<FeedbackMechanismProps> = ({ messageId, onFeedback }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFeedback = (isPositive: boolean) => {
    if (!feedbackGiven) {
      onFeedback(messageId, isPositive);
      setFeedbackGiven(true);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Tooltip title="Helpful">
        <IconButton onClick={() => handleFeedback(true)} color={feedbackGiven ? "primary" : "default"} disabled={feedbackGiven}>
          <ThumbUpIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Not helpful">
        <IconButton onClick={() => handleFeedback(false)} color={feedbackGiven ? "primary" : "default"} disabled={feedbackGiven}>
          <ThumbDownIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Thank you for your feedback!"
      />
    </Box>
  );
};
