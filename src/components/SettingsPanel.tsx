import React, { useState } from "react";
import { Box, Typography, Switch, Slider, TextField, Button } from "@mui/material";

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [promptTemplate, setPromptTemplate] = useState("");
  const [temperature, setTemperature] = useState(0.3);
  const [useSemanticRanker, setUseSemanticRanker] = useState(true);
  const [useSemanticCaptions, setUseSemanticCaptions] = useState(false);

  return (
    <Box sx={{ position: "fixed", inset: 0, bgcolor: "rgba(0, 0, 0, 0.5)", zIndex: "modal", display: "flex", justifyContent: "flex-end" }}>
      <Box sx={{ bgcolor: "background.paper", width: "100%", maxWidth: 400, p: 3, overflowY: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Settings</Typography>
          <Button onClick={onClose} color="inherit">
            Close
          </Button>
        </Box>
        <Box sx={{ "& > :not(:last-child)": { mb: 3 } }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Prompt Template
            </Typography>
            <TextField fullWidth multiline rows={3} value={promptTemplate} onChange={(e) => setPromptTemplate(e.target.value)} />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Temperature: {temperature}
            </Typography>
            <Slider value={temperature} onChange={(_, newValue) => setTemperature(newValue as number)} min={0} max={1} step={0.1} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Use Semantic Ranker</Typography>
            <Switch checked={useSemanticRanker} onChange={(e) => setUseSemanticRanker(e.target.checked)} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Use Semantic Captions</Typography>
            <Switch checked={useSemanticCaptions} onChange={(e) => setUseSemanticCaptions(e.target.checked)} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
