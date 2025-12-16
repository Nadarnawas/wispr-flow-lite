# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



No worries at all 🙂 — this is actually the **perfect time** to rewrite the README, because now your project is **complete, stable, and polished**.

Below is a **clean, professional, interview-ready README** written **from scratch**, tailored exactly to **what you built** (no false claims, no confusion).
You can **copy–paste this entire content** into your `README.md`.

---

# 🧠 Wispr Flow Lite — Voice-to-Text Desktop App

A lightweight, cross-platform **AI-powered voice-to-text desktop application**, built with **Tauri**, **React**, and **Deepgram**, inspired by the core workflow of **Wispr Flow**.

This project focuses on **real-time speech transcription**, **low-latency audio streaming**, and **reliable handling of short voice inputs**, rather than pixel-perfect UI replication.

---

## 🚀 Project Overview

Wispr Flow Lite enables users to **press a button (or spacebar), speak, and instantly see accurate transcribed text**.
The application demonstrates how modern desktop apps can integrate **real-time AI services** with **native performance** using Tauri.

The goal of this project is to showcase:

* Real-time audio capture
* Streaming speech recognition
* Clean architecture
* Robust handling of real-world edge cases

---

## 🛠️ Tech Stack

### Desktop Framework

* **Tauri** — lightweight, secure, cross-platform desktop framework
  (Windows, macOS, Linux)

### Frontend

* **React (Vite)** — UI and state management
* **CSS** — custom styling, animations, and UI polish

### Speech Recognition

* **Deepgram Real-Time WebSocket API**

  * Model: `nova-2`
  * Low-latency streaming transcription

---

## ✨ Core Features

### 🎙️ Push-to-Talk Voice Input

* Hold the **button** or **spacebar** to start recording
* Release to stop recording and finalize transcription

### 🎧 Real-Time Speech Transcription

* Audio is streamed to Deepgram in near real-time
* Accurate transcription with minimal latency

### ⚡ Zero First-Word Clipping

* Audio buffering during WebSocket connection setup
* Ensures the **first spoken word is never lost**

### 🧠 Reliable Short-Press Handling

* Explicit stream finalization using Deepgram control messages
* Minimum recording duration enforced
* Single-word and ultra-short utterances are transcribed correctly

### 🖥️ Clean & Modern UI

* Dark gradient background
* Glass-style card layout
* Recording pulse animation
* Live waveform animation while recording
* Tooltip hint for usability

### 📋 Copy to Clipboard

* One-click copy of the transcribed text

---

## 🧩 Architecture Overview

The application follows a **clear separation of concerns**:

### UI Layer (React)

* Handles user interaction and visual feedback
* Displays transcription results
* Controls recording state

### Audio Layer (Web Audio API)

* Captures microphone input
* Converts audio to 16-bit PCM format
* Streams audio chunks efficiently

### Transcription Layer (Deepgram WebSocket)

* Manages WebSocket lifecycle
* Buffers audio during connection handshake
* Explicitly finalizes streams for reliability

This structure ensures the app is:

* Easy to understand
* Easy to extend
* Resistant to common real-time streaming issues

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

> ⚠️ `.env` is included in `.gitignore` and should never be committed.

---

## ▶️ Run the Application (Development)

```bash
npm run tauri dev
```

This launches the desktop app using Tauri.

---

## 🧪 Key Engineering Challenges Solved

### 🔹 First-Word Clipping

Solved by buffering audio until the WebSocket connection is fully open.

### 🔹 Short Utterance Drop

Solved by:

* Explicit Deepgram stream finalization (`CloseStream`)
* Enforcing a minimum recording duration

### 🔹 UI Stability During Animations

Solved by scoped CSS animations and explicit rendering control.

These fixes reflect **real-world production concerns**, not just demo behavior.

---

## 📌 Known Limitations

* Currently configured for **English (`en-US`) transcription**

  * Multi-language support can be added by passing a dynamic `language` parameter to Deepgram
* Uses `ScriptProcessorNode` (deprecated but stable)

  * Can be migrated to `AudioWorklet` for future-proofing

---

## 🎥 Demo Video

A short demo video showing:

* Push-to-talk recording
* Live transcription
* Short-press reliability
* UI animations

📎 *Link provided in the assignment submission.*

---

## 🧠 What This Project Demonstrates

* Real-time audio streaming
* AI service integration
* Desktop application development with Tauri
* Debugging and handling edge cases
* Product-focused engineering decisions

---

## 📬 Submission Notes

This project prioritizes **functionality, reliability, and clean architecture** over visual perfection.
All major edge cases encountered during real-time transcription were identified and resolved iteratively.

---

## 👤 Author

**Nadar Nawas**
BTech Computer Science
Voice-to-Text Desktop Application Project

---

### ✅ NEXT STEP (IMPORTANT)

After pasting this into `README.md`, run:

```bash
git add README.md
git commit -m "Rewrite README with clean architecture and final feature details"
git push