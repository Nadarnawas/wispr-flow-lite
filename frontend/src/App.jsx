import { useState, useRef, useEffect } from "react";


const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;


function App() {
  const [isRecording, setIsRecording] = useState(false);
const [finalTranscript, setFinalTranscript] = useState("");
const [interimTranscript, setInterimTranscript] = useState("");

  const copyToClipboard = () => {
  if (!finalTranscript) return;
  navigator.clipboard.writeText(finalTranscript.trim());
  alert("Transcript copied to clipboard");
};



  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const inputRef = useRef(null);
  const audioBufferQueue = useRef([]); // <-- ADD THIS LINE
  const recordingStartTimeRef = useRef(0);
  const MIN_RECORDING_MS = 180;




  const startRecording = async () => {
    setFinalTranscript("");
setInterimTranscript("");

    recordingStartTimeRef.current = Date.now();


    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);
      processor.onaudioprocess = (event) => {
  const inputData = event.inputBuffer.getChannelData(0);

  // DEBUG LOG
  console.log("Audio chunk size:", inputData.length);

  const buffer = new Int16Array(inputData.length);
  for (let i = 0; i < inputData.length; i++) {
    buffer[i] = inputData[i] * 32767;
  }

  if (
  socketRef.current &&
  socketRef.current.readyState === WebSocket.OPEN
) {
  socketRef.current.send(buffer);
} else {
  // 🔥 Buffer audio until socket connects
  audioBufferQueue.current.push(buffer);
}


};

      source.connect(processor);
      processor.connect(audioContext.destination);

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

        // 🔥 Send buffered audio first
  audioBufferQueue.current.forEach((chunk) => {
    socket.send(chunk);
  });

  // Clear buffer after flush
  audioBufferQueue.current = [];
      };

      socket.onmessage = (message) => {
  const data = JSON.parse(message.data);

  if (!data.channel) return;

  const alternative = data.channel.alternatives[0];
  const transcriptText = alternative.transcript;
  const isFinal = data.is_final === true;

  if (!transcriptText) return;

  if (isFinal) {
    // ✅ Commit final text
    setFinalTranscript((prev) => prev + " " + transcriptText);
    setInterimTranscript(""); // clear interim
  } else {
    // ✏️ Show live interim text
    setInterimTranscript(transcriptText);
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
  const elapsed =
    Date.now() - recordingStartTimeRef.current;

  // 🛑 If recording was too short, wait a bit
  const delay =
    elapsed < MIN_RECORDING_MS
      ? MIN_RECORDING_MS - elapsed
      : 0;

  setTimeout(() => {
    setIsRecording(false);

    processorRef.current?.disconnect();
    inputRef.current?.disconnect();
    audioContextRef.current?.close();

    // ✅ Proper Deepgram finalize
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({ type: "CloseStream" })
      );
    }

    // Allow final transcript to arrive
    setTimeout(() => {
      socketRef.current?.close();
    }, 350);

    audioBufferQueue.current = [];
  }, delay);
  setInterimTranscript("");

};



useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === "Space" && !isRecording) {
      startRecording();
    }
  };

  const handleKeyUp = (e) => {
    if (e.code === "Space") {
      stopRecording();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, [isRecording]);

  return (
  <div className="app">
    <div className="card">
      <h1>Wispr Flow Lite</h1>

      <div className="tooltip-wrapper">
  <button
    className={isRecording ? "recording" : ""}
    onMouseDown={startRecording}
    onMouseUp={stopRecording}
  >
    {isRecording ? "Recording..." : "Hold to Talk"}
  </button>
  <span className="tooltip">Hold Spacebar to talk</span>
</div>

{isRecording && (
  <div className="waveform">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
)}


    <textarea
  value={isRecording ? `${finalTranscript} ${interimTranscript}` : finalTranscript}
  readOnly={isRecording}
  onChange={(e) => {
    if (!isRecording) {
      setFinalTranscript(e.target.value);
    }
  }}
  placeholder="Your speech will appear here..."
/>




      <button onClick={copyToClipboard}>
        Copy Transcript
      </button>
    </div>
  </div>
);



}

export default App;
