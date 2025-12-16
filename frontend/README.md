## 🧠 Wispr Flow Lite — Voice-to-Text Desktop App

A lightweight, cross-platform **AI-powered voice-to-text desktop application** built with **Tauri**, **React**, and **Deepgram**, inspired by the core workflow of **Wispr Flow**.

This project focuses on **real-time speech transcription**, **streaming reliability**, and **practical user experience**, rather than pixel-perfect UI replication.

---

## 🚀 Project Overview

Wispr Flow Lite allows users to **press and hold a button (or spacebar), speak, and see their speech converted into text**.

The application provides:

* **Live (interim) transcription** while speaking
* **Accurate final transcription** after pauses or recording stops
* **Editable final transcript** for manual correction

The goal of this project is to demonstrate **real-world AI-powered desktop application development**, including audio streaming, WebSocket-based transcription, and careful handling of edge cases.

---

## 🛠️ Tech Stack

### Desktop Framework

* **Tauri** — lightweight, secure, cross-platform desktop framework
  (Windows, macOS, Linux)

### Frontend

* **React (Vite)** — UI and state management
* **CSS** — custom layout, animations, and visual feedback

### Speech Recognition

* **Deepgram Real-Time WebSocket API**

  * Model: `nova-2`
  * Near real-time speech-to-text transcription

---

## ✨ Core Features

### 🎙️ Push-to-Talk Voice Input

* Hold the **record button** or **spacebar** to start recording
* Release to stop recording and finalize transcription

---

### ⚡ Live Interim Transcription

* Text appears **while the user is speaking**
* Provides immediate feedback during long sentences
* Interim text is temporary and not permanently committed

---

### ✅ Accurate Final Transcription

* Interim text is replaced by **final, stable transcription**
* Final text is committed only when Deepgram confirms confidence
* Prevents duplication, flicker, and unstable output

---

### ✍️ Editable Final Transcript

* Transcript becomes **editable after recording stops**
* Allows users to correct or refine AI-generated text
* Editing is disabled while recording to avoid conflicts
* Cursor-safe controlled input handling (no cursor jumping)

---

### 🧠 Streaming Reliability

* Audio buffering during WebSocket connection setup prevents first-word clipping
* Explicit stream finalization ensures short utterances are transcribed correctly
* Minimum recording duration avoids dropped single-word inputs

---

### 🖥️ Clean & Polished UI

* Dark gradient background with glass-style card layout
* Recording pulse animation
* Live waveform animation during recording
* One-time tooltip hint that fades automatically for unobtrusive onboarding

---

### 📋 Copy to Clipboard

* One-click copy of **final transcript only**
* Interim text is excluded to maintain accuracy

---

## 🧩 Architecture Overview

The application follows a **clear separation of concerns**:

### UI Layer (React)

* Handles user interaction and visual feedback
* Displays interim and final transcription
* Manages recording and editing state

### Audio Layer (Web Audio API)

* Captures microphone input
* Converts audio to 16-bit PCM format
* Streams audio efficiently in small chunks

### Transcription Layer (Deepgram WebSocket)

* Manages WebSocket lifecycle
* Buffers audio during connection handshake
* Emits interim and final transcription results
* Explicitly finalizes streams to ensure reliability

This structure keeps the codebase **maintainable, understandable, and extensible**.

---

## 🔐 Environment Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/wispr-flow-lite.git
cd wispr-flow-lite
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

> ⚠️ The `.env` file is included in `.gitignore` and should never be committed.

---

## ▶️ Run the Application (Development)

```bash
npm run tauri dev
```

---

## 🧪 Error Handling

* User-friendly alerts for microphone permission failures
* Graceful handling of Deepgram WebSocket errors
* Defensive parsing of transcription messages
* Clean shutdown of audio and network resources to prevent crashes

---

## 📌 Known Limitations

* Currently configured for **English (`en-US`) transcription**

  * Multi-language support can be added by dynamically changing Deepgram parameters
* Uses `ScriptProcessorNode` (deprecated but stable)

  * Can be migrated to `AudioWorkletNode` for lower latency in a production version
* Interim transcription prioritizes clarity over illusion-level typing speed

---

## 🧠 What This Project Demonstrates

* Real-time audio streaming
* AI-powered speech recognition integration
* Desktop application development with Tauri
* Practical handling of real-world edge cases
* Thoughtful tradeoffs between speed, accuracy, and UX

---

## 👤 Author

**Nadar Nawas**
BTech Computer Science
Voice-to-Text Desktop Application Project