import { useState, useRef, useEffect } from "react";

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

const GRACE_CAPTURE_MS = 200;  // continue recording briefly after release
const MIN_RECORDING_MS = 140;  // optimized short press threshold

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const inputRef = useRef(null);

  const audioBufferQueue = useRef([]);
  const finalReceivedRef = useRef(false);
  const recordingStartTimeRef = useRef(0);

  const copyToClipboard = () => {
    const combined = `${finalTranscript} ${interimTranscript}`.trim();
    if (!combined) return;
    navigator.clipboard.writeText(combined);
    alert("Transcript copied to clipboard");
  };

  const startRecording = async () => {
    setFinalTranscript("");
    setInterimTranscript("");

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.close(1000, "Restart session");
    }

    finalReceivedRef.current = false;
    recordingStartTimeRef.current = Date.now();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(256, 1, 1);

      processor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const buffer = new Int16Array(inputData.length);

        for (let i = 0; i < inputData.length; i++) {
          buffer[i] = inputData[i] * 32767;
        }

        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(buffer);
        } else {
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
        audioBufferQueue.current.forEach((c) => socket.send(c));
        audioBufferQueue.current = [];
        console.log("Deepgram connected + Grace mode + Interim persistence");
      };

      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (!data.channel) return;

        const alternative = data.channel.alternatives[0];
        const text = alternative.transcript;
        const isFinal = data.is_final;

        if (!text) return;

        if (!isFinal) {
          // KEEP interim visible even after release
          setInterimTranscript(text);
        }

        if (isFinal) {
          finalReceivedRef.current = true;
          setFinalTranscript((prev) => (prev + " " + text).trim());
          setInterimTranscript("");
        }
      };

      socket.onerror = (e) => console.error("Deepgram WS error:", e);
      socket.onclose = (e) => console.log("Deepgram closed:", e.code);

      socketRef.current = socket;
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access failed:", err);
      alert("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);

    const socket = socketRef.current;
    if (!socket) return;

    const recordingDuration = Date.now() - recordingStartTimeRef.current;
    const grace = recordingDuration < GRACE_CAPTURE_MS ? GRACE_CAPTURE_MS : 0;

    console.log(`Applying grace: ${grace}ms`);

    setTimeout(() => {
      processorRef.current?.disconnect();
      inputRef.current?.disconnect();
      audioContextRef.current?.close();
      audioBufferQueue.current = [];

      let waitForFinal = setInterval(() => {
        if (finalReceivedRef.current || socket.readyState !== WebSocket.OPEN) {
          clearInterval(waitForFinal);

          if (socket.readyState === WebSocket.OPEN) {
            socket.close(1000, "Normal close");
          }
        }
      }, 45);

      setTimeout(() => {
        clearInterval(waitForFinal);
        if (socket.readyState === WebSocket.OPEN) {
          socket.close(1000, "Forced");
        }
      }, 1400);
    }, grace);
  };

  useEffect(() => {
    const down = (e) => {
      if (document.activeElement.tagName === "TEXTAREA") return;
      if (e.code === "Space" && !isRecording) {
        e.preventDefault();
        startRecording();
      }
    };

    const up = (e) => {
      if (document.activeElement.tagName === "TEXTAREA") return;
      if (e.code === "Space") stopRecording();
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
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

        {/* Interim stays visible always */}
        <textarea
          value={`${finalTranscript} ${interimTranscript}`.trim()}
          readOnly={false}
          spellCheck={false}
          onChange={(e) => setFinalTranscript(e.target.value)}
          placeholder="Your speech will appear here..."
        />

        <button onClick={copyToClipboard}>Copy Transcript</button>
      </div>
    </div>
  );
}

export default App;
