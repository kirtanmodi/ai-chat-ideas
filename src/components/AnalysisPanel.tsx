import React, { useState } from "react";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { ThoughtProcess } from "./ThoughtProcess";

interface AnalysisPanelProps {
  onClose: () => void;
}

const sampleThoughtSteps = [
  {
    step: "Understand the query",
    thought: "The user is asking about the capital of France.",
    action: "Retrieve information about France and its capital.",
  },
  {
    step: "Gather information",
    thought: "Paris is the capital and most populous city of France.",
    action: "Confirm this information from multiple sources.",
  },
  {
    step: "Formulate response",
    thought: "I should provide a clear and concise answer, mentioning Paris as the capital.",
    action: "Compose a response stating that Paris is the capital of France.",
  },
];

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"thought" | "content" | "citation">("thought");

  return (
    <Box sx={{ width: 384, bgcolor: "background.paper", borderLeft: 1, borderColor: "divider", p: 2, overflowY: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" component="h2">
          Analysis
        </Typography>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </Box>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Thought Process" value="thought" />
        <Tab label="Supporting Content" value="content" />
        <Tab label="Citation" value="citation" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {activeTab === "thought" && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Thought Process
            </Typography>
            <ThoughtProcess steps={sampleThoughtSteps} />
          </Box>
        )}
        {activeTab === "content" && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Supporting Content
            </Typography>
            <Typography>This is where supporting content would be displayed.</Typography>
          </Box>
        )}
        {activeTab === "citation" && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Citation
            </Typography>
            <Typography>This is where citation information would be displayed.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
