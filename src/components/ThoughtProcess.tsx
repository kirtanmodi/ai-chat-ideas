import React from "react";
import { Box, Typography } from "@mui/material";

interface ThoughtStep {
  step: string;
  thought: string;
  action?: string;
}

interface ThoughtProcessProps {
  steps: ThoughtStep[];
}

export const ThoughtProcess: React.FC<ThoughtProcessProps> = ({ steps }) => {
  return (
    <Box sx={{ "& > :not(:last-child)": { mb: 2 } }}>
      {steps.map((step, index) => (
        <Box key={index} sx={{ borderLeft: 2, borderColor: "primary.main", pl: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                bgcolor: "primary.main",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.contrastText",
                fontWeight: "bold",
                fontSize: "0.75rem",
                mr: 1,
              }}
            >
              {index + 1}
            </Box>
            <Typography variant="h6" component="h4">
              {step.step}
            </Typography>
          </Box>
          <Typography sx={{ mt: 1 }}>{step.thought}</Typography>
          {step.action && (
            <Box sx={{ mt: 1, bgcolor: "action.hover", p: 1, borderRadius: 1 }}>
              <Typography>
                <strong>Action:</strong> {step.action}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
