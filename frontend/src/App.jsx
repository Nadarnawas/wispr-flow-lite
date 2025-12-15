import { useState, useRef } from "react";
import "./App.css";

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;


function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const inputRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processorRef.current = processor;
      inputRef.current = source;

      const socket = new WebSocket(
  "wss://api.deepgram.com/v1/listen" +
    "?model=nova-2" +
    "&language=en-US" +
    "&punctuate=true" +
    "&interim_results=true" +
    "&encoding=linear16" +
    "&sample_rate=16000",
  ["token", DEEPGRAM_API_KEY]
);




      socket.onopen = () => {
        console.log("Deepgram connected");

        processor.onaudioprocess = (event) => {
  const inputData = event.inputBuffer.getChannelData(0);

  // DEBUG LOG
  console.log("Audio chunk size:", inputData.length);

  const buffer = new Int16Array(inputData.length);
  for (let i = 0; i < inputData.length; i++) {
    buffer[i] = inputData[i] * 32767;
  }

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(buffer);
  }
};


        source.connect(processor);
        processor.connect(audioContext.destination);
      };

      socket.onmessage = (message) => {
  const data = JSON.parse(message.data);

  if (!data.channel) return;

  const alternative = data.channel.alternatives[0];
  const transcriptText = alternative.transcript;
  const isFinal = data.is_final === true;

  if (!transcriptText) return;

  if (isFinal) {
    // Append only FINAL transcript
    setTranscript((prev) => prev + " " + transcriptText);
  }
};


     socket.onerror = (event) => {
  console.error("Deepgram WebSocket error event:", event);
};

socket.onclose = (event) => {
  console.error("Deepgram WebSocket closed:", event);
};


      socketRef.current = socket;
      setIsRecording(true);
    } catch (err) {
  // Log full error only for developers
  console.error("Start recording failed:", err);

  // Show clean message only once to the user
  alert(
    "Microphone access failed. Please allow microphone permission and try again."
  );
}

  };



  const stopRecording = () => {
  setIsRecording(false);

  processorRef.current?.disconnect();
  inputRef.current?.disconnect();
  audioContextRef.current?.close();

  // ⏳ IMPORTANT: allow Deepgram time to send final transcript
  setTimeout(() => {
    socketRef.current?.close();
    console.log("Deepgram socket closed after delay");
  }, 1000); // 1 second delay

  console.log("Recording stopped");
};


  return (
    <div className="container">
      <h1>Wispr Flow Lite</h1>

      <button
        className={isRecording ? "recording" : ""}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
      >
        {isRecording ? "Recording..." : "Hold to Talk"}
      </button>

      <textarea
        placeholder="Speak and see text appear..."
        value={transcript}
        readOnly
      />
    </div>
  );
}

export default App;
