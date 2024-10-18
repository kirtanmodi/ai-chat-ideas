import React, { useState, useMemo } from "react";
import { Box, TextField, Button, CircularProgress, Typography, Paper } from "@mui/material";
import axios from "axios";
import * as materialUI from "@mui/material";

interface DynamicComponentGeneratorProps {
  onComponentGenerated: (component: React.ReactNode) => void;
}

export const DynamicComponentGenerator: React.FC<DynamicComponentGeneratorProps> = ({ onComponentGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedComponent, setGeneratedComponent] = useState<React.ReactNode | null>(null);

  const handleGenerateComponent = async () => {
    setLoading(true);
    setError(null);
    setGeneratedComponent(null);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates React components based on user descriptions. Respond with only the component code, no other text.",
            },
            {
              role: "user",
              content: `Create a React component using Material-UI based on the following description: ${prompt}`,
            },
          ],
          max_tokens: 500,
          model: "gpt-4",
          temperature: 0.7,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const generatedComponentCode = response.data.choices[0].message.content.trim();

      // Create a dynamic component from the generated code
      const DynamicComponent = useMemo(() => {
        try {
          // Remove the import statement and export default
          const codeWithoutImportAndExport = generatedComponentCode
            .replace(/import React from 'react';/, "")
            .replace(/import {[^}]+} from '@mui\/material';/, "")
            .replace(/export default \w+;/, "");

          // Use Function constructor to create a new function that returns the component
          return new Function(
            "React",
            "materialUI",
            `
            const { ${Object.keys(materialUI).join(", ")} } = materialUI;
            return (${codeWithoutImportAndExport})
          `
          )(React, materialUI);
        } catch (err) {
          console.error("Error creating dynamic component:", err);
          setError("Failed to create component. The generated code might be invalid.");
          return null;
        }
      }, [generatedComponentCode]);

      if (DynamicComponent) {
        const componentToRender = <DynamicComponent />;
        setGeneratedComponent(componentToRender);
        onComponentGenerated(componentToRender);
      }
    } catch (err) {
      setError("Failed to generate component. Please try again.");
      console.error("Error generating component:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Describe the component you want to generate"
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        multiline
        rows={3}
      />
      <Button variant="contained" onClick={handleGenerateComponent} disabled={loading || !prompt.trim()}>
        Generate Component
      </Button>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {generatedComponent && (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Generated Component:
          </Typography>
          {generatedComponent}
        </Paper>
      )}
    </Box>
  );
};
