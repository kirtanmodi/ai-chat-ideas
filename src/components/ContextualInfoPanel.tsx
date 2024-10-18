import React from "react";
import { Box, Typography, Link, List, ListItem, ListItemText } from "@mui/material";

interface ContextualInfo {
  title: string;
  description: string;
  links: Array<{ text: string; url: string }>;
}

interface ContextualInfoPanelProps {
  info: ContextualInfo | null;
}

export const ContextualInfoPanel: React.FC<ContextualInfoPanelProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  return (
    <Box sx={{ width: 300, p: 2, bgcolor: "background.paper", borderLeft: 1, borderColor: "divider" }}>
      <Typography variant="h6" gutterBottom>
        {info.title}
      </Typography>
      <Typography variant="body2" paragraph>
        {info.description}
      </Typography>
      {info.links.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Related Links:
          </Typography>
          <List dense>
            {info.links.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  primary={
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};
