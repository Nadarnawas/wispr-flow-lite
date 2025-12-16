# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



Wispr Flow Lite

A cross-platform desktop voice-to-text application built using Tauri and Deepgram, inspired by the core workflow of Wispr Flow.
The project focuses on real-time English speech transcription, clean architecture, and reliable audio streaming rather than UI polish.

🚀 Project Overview

Wispr Flow Lite enables users to convert spoken English speech into text using a push-to-talk interaction.
The application captures microphone audio, streams it in real time to Deepgram’s speech recognition API, and displays accurate transcriptions with minimal latency.

This project demonstrates practical skills in:

Desktop application development

Real-time audio processing

AI API integration

Debugging and problem-solving

Clean and maintainable code structure

✨ Features

Push-to-Talk Voice Input

Hold a button or spacebar to start recording

Release to stop recording

Real-Time English Speech-to-Text

Live audio streaming to Deepgram

Accurate transcription using the nova-2 model

Language: English (en-US)

Keyboard Shortcut Support

Hold Spacebar to record

Release Spacebar to stop recording

Clipboard Integration

One-click copy of the transcribed text

Automatic Transcript Reset

Transcript clears automatically when a new recording starts

Clear Error Handling

User-friendly error messages

Detailed error logs in the developer console

Cross-Platform Desktop Support

Runs on Windows, macOS, and Linux via Tauri

🛠️ Tech Stack

Tauri – Lightweight cross-platform desktop framework

React – Frontend UI and state management

Deepgram API – Real-time speech-to-text transcription

Web Audio API – Microphone access and audio processing

WebSockets – Low-latency audio streaming

🧱 Architecture Overview

The application follows a clear separation of concerns:

1. UI Layer (React)

Push-to-talk controls

Transcript display

Clipboard interaction

User feedback and alerts

2. Audio Capture Layer

Microphone access via getUserMedia

Audio processing using AudioContext

Conversion of audio samples to 16-bit PCM format

3. Transcription Layer

WebSocket-based streaming to Deepgram

Handling of interim and final transcription results

Final-only transcript rendering to avoid duplication

🔑 Key Implementation Details

Push-to-Talk Logic

Implemented using mouse and keyboard events

Recording starts on press and stops on release

Audio Streaming

Audio data is captured and streamed in real time

Sample rate and encoding explicitly matched with Deepgram requirements

Interim vs Final Results

Interim transcription results are ignored

Only final transcripts are appended to prevent repeated text

Delayed WebSocket Close

A short delay is applied before closing the WebSocket to ensure final transcripts are received

⚠️ Known Limitations

Language Support

Currently supports English only (en-US)

Client-Side API Key

Deepgram API key is used on the client side for prototyping

In production, this should be moved to the Tauri backend

Deprecated Audio API

ScriptProcessorNode is used for simplicity and clarity

A future version can migrate to AudioWorkletNode

Minimal UI Styling

UI is intentionally simple to prioritize functionality

🔐 Environment Variables

Create a .env file inside the frontend directory:

VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here


⚠️ .env is included in .gitignore and must not be committed.

▶️ Setup & Run Instructions
git clone <repository-url>
cd wispr-flow-lite
cd frontend
npm install
npx tauri dev

🧪 Usage

Launch the application

Hold Hold to Talk or Spacebar

Speak English clearly

Release to stop recording

View the transcribed text

Copy text using the clipboard button

🎯 Future Improvements

Add multi-language support using Deepgram language models

Language selection UI

Move transcription logic to Tauri backend

Replace ScriptProcessorNode with AudioWorkletNode

Add global system-wide hotkeys

Improve UI/UX and accessibility

🏁 Conclusion

Wispr Flow Lite demonstrates a complete AI-powered desktop voice-to-text workflow for English speech, covering audio capture, real-time streaming, transcription, and user interaction.
The project emphasizes clean architecture, reliability, and practical engineering decisions, making it suitable for technical evaluation and interviews.