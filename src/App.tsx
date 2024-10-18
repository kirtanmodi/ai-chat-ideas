import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Container, Button, TextField, IconButton, Typography } from "@mui/material";
import { ChatMessage } from "./components/ChatMessage";
import { AnalysisPanel } from "./components/AnalysisPanel";
import { SettingsPanel } from "./components/SettingsPanel";
import { ThoughtProcess } from "./components/ThoughtProcess";
import ReactMarkdown from "react-markdown";
import { VoiceInput } from "./components/VoiceInput";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { ContextualInfoPanel } from "./components/ContextualInfoPanel";
import { DynamicComponentGenerator } from "./components/DynamicComponentGenerator";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ id: string; type: "user" | "ai"; content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [isAnalysisPanelOpen, setIsAnalysisPanelOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [thoughtSteps, setThoughtSteps] = useState<Array<{ step: string; thought: string; action?: string }>>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [contextualInfo, setContextualInfo] = useState<ContextualInfo | null>(null);
  const [generatedComponent, setGeneratedComponent] = useState<React.ReactNode | null>(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#0f3460",
      },
      background: {
        default: darkMode ? "#1a1a2e" : "#f0f2f5",
        paper: darkMode ? "#16213e" : "#ffffff",
      },
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessageId = Date.now().toString();
      const newUserMessage = { id: userMessageId, type: "user", content: inputValue };
      setMessages((prev) => [...prev, newUserMessage]);
      simulateAIThoughtProcess(inputValue);
      updateContextualInfo(inputValue);
      setTimeout(() => {
        const aiMessageId = (Date.now() + 1).toString();
        const aiResponse = `Echo: ${inputValue}`;
        setMessages((prev) => [...prev, { id: aiMessageId, type: "ai", content: aiResponse }]);
        updateContextualInfo(aiResponse);
      }, 1000);
      setInputValue("");
    }
  };
  const simulateAIThoughtProcess = (userInput: string) => {
    const steps = [
      {
        step: "Analyze Input",
        thought: `Received user input: "${userInput}"`,
        action: "Parse and understand the user's request",
      },
      {
        step: "Generate Response",
        thought: "Formulating an appropriate response based on the input",
        action: "Create a response echoing the user's input",
      },
      {
        step: "Review and Refine",
        thought: "Ensuring the response is clear and relevant",
      },
    ];
    setThoughtSteps(steps);
  };

  const handleVoiceInput = (transcript: string) => {
    setInputValue(transcript);
  };
  console.log(inputValue);

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setFeedback((prev) => ({ ...prev, [messageId]: isPositive }));
    // Here you would typically send the feedback to your backend
    console.log(`Feedback for message ${messageId}: ${isPositive ? "Positive" : "Negative"}`);
  };

  const updateContextualInfo = (message: string) => {
    // This is a simple example. In a real application, you'd use more sophisticated
    // natural language processing or AI to determine relevant contextual information.
    if (message.toLowerCase().includes("react")) {
      setContextualInfo({
        title: "React",
        description: "React is a JavaScript library for building user interfaces.",
        links: [
          { text: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
          { text: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html" },
        ],
      });
    } else if (message.toLowerCase().includes("typescript")) {
      setContextualInfo({
        title: "TypeScript",
        description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
        links: [
          { text: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs/" },
          { text: "TypeScript Playground", url: "https://www.typescriptlang.org/play" },
        ],
      });
    } else {
      setContextualInfo(null);
    }
  };

  const handleGeneratedComponent = (component: React.ReactNode) => {
    setGeneratedComponent(component);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, overflow: "hidden" }}>
        <Box component="header" sx={{ bgcolor: "background.paper", p: 2, boxShadow: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box component="h1" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Chat AI
              </Box>
              <Box>
                <DarkModeSwitch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <Button onClick={() => setIsAnalysisPanelOpen(!isAnalysisPanelOpen)} variant="contained" sx={{ ml: 2 }}>
                  Analysis
                </Button>
                <Button onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} variant="contained" sx={{ ml: 2 }}>
                  Settings
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, display: "flex", overflow: "hidden", bgcolor: "background.default" }}>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2, overflowY: "auto" }}>
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} onFeedback={handleFeedback}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </ChatMessage>
              ))}
              <div ref={messagesEndRef} />
            </Box>
            {/* <DynamicComponentGenerator onComponentGenerated={handleGeneratedComponent} /> */}
            {/* {generatedComponent} */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  InputProps={{
                    endAdornment: <VoiceInput onTranscript={handleVoiceInput} />,
                  }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ ml: 1 }}>
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
          {isAnalysisPanelOpen && <AnalysisPanel onClose={() => setIsAnalysisPanelOpen(false)} />}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                width: "300px",
                p: 2,
                bgcolor: "background.paper",
                overflowY: "auto",
              }}
            >
              <Box component="h3" sx={{ fontSize: "1.2rem", mb: 2 }}>
                AI Thought Process
              </Box>
              <ThoughtProcess steps={thoughtSteps} />
            </Box>
            <ContextualInfoPanel info={contextualInfo} />
          </Box>
        </Box>

        {isConfigPanelOpen && <SettingsPanel onClose={() => setIsConfigPanelOpen(false)} />}
      </Box>
    </ThemeProvider>
  );
};

export default App;
