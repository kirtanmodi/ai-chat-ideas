import React, { useState, useCallback, useRef } from "react";
import { IconButton, CircularProgress, Snackbar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  lang?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, lang = "en-US" }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    setIsListening(true);
    setError(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      setIsListening(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      onTranscript(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setError("Failed to start speech recognition. Please try again.");
      setIsListening(false);
    }
  }, [lang, onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const handleToggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <>
      <IconButton
        onClick={handleToggleListening}
        color={isListening ? "secondary" : "default"}
        aria-label={isListening ? "Stop voice input" : "Start voice input"}
      >
        {isListening ? <CircularProgress size={24} /> : isListening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError} message={error} />
    </>
  );
};
