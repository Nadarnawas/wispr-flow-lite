# 🎙️ Wispr Flow Lite

**AI-Powered Push-to-Talk Voice-to-Text Desktop Application**

Built using **Tauri**, **React**, and **Deepgram**

---

## 🚀 Overview

**Wispr Flow Lite** is a lightweight, cross-platform **desktop application** that converts speech into text using a **push-to-talk workflow**.

Inspired by the core experience of **Wispr Flow**, this project focuses on:

* real-time audio streaming
* low-latency AI transcription
* reliable short-utterance handling
* clean desktop-first architecture

The emphasis is on **engineering quality and real-world reliability**, not pixel-perfect UI replication.

---

## ✨ Key Features

* 🎙️ Push-to-talk via mouse or Spacebar
* ⚡ Live interim transcription
* ✅ Accurate final transcription
* ✍️ Editable transcript after recording
* 🧠 Audio buffering for short presses (~140–200ms)
* 🎨 Waveform + recording pulse animation
* 📋 Copy final transcript to clipboard
* ⌨️ Spacebar disabled while editing text
* 🖥️ Native Windows desktop installers

---

## 🧠 Tech Stack

| Layer              | Technology             |
| ------------------ | ---------------------- |
| Desktop Runtime    | Tauri (Rust + WebView) |
| Frontend           | React + Vite           |
| Audio              | Web Audio API          |
| Speech Recognition | Deepgram Streaming API |
| Packaging          | NSIS / MSI             |

---

## 🏗️ Project Architecture

```
User Voice
   ↓
Microphone (Web Audio API)
   ↓
Audio Processing (16-bit PCM)
   ↓
Deepgram WebSocket (Streaming)
   ↓
Interim / Final Transcription
   ↓
React UI (Desktop via Tauri)
```

---

## 🖥️ Installation (Windows)

Download the installer from GitHub Releases:

👉 **[https://github.com/Nadarnawas/wispr-flow-lite/releases/latest]

Available Installers

    .exe — Standard Windows installer (recommended)

    .msi — Enterprise installer

Install Steps

1. Download the installer

2. Run the setup file

3. Follow the wizard

4. Launch Wispr Flow Lite from Start Menu

Node.js and Rust are not required to run the installed application.

---

## 🛠️ Development Setup

### Prerequisites

* Node.js ≥ 18
* Rust toolchain
* Visual Studio Build Tools (Windows)

---

### Clone Repository

```bash
git clone https://github.com/Nadarnawas/wispr-flow-lite
cd wispr-flow-lite
```

---

### Frontend Setup (Required)

📍 **Run inside `frontend/`**

```bash
cd frontend
npm install
```

Create `.env` inside `frontend/`:

```env
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key
```

---

## ▶️ Run Frontend Only (Web – Development)

📍 **Run inside `frontend/`**

```bash
npm run dev
```

* Opens the app in browser at `http://localhost:5173`
* Used for UI and logic debugging
* **Not the final desktop experience**

---

## ▶️ Run Desktop App (Development)

📍 **Run from project root**

```bash
cd ..
npx tauri dev
```

* Launches the full desktop application
* This is the **primary evaluation mode**

---

## 📦 Build Production Desktop App

📍 **Run from project root**

```bash
npx tauri build
```

Installers generated at:

```
src-tauri/target/release/bundle/
```

---

## 🧪 Error Handling

* Microphone permission failures handled gracefully
* Deepgram WebSocket errors handled defensively
* Clean shutdown of audio + network resources

---

## 📌 Known Limitations

* English (`en-US`) only
* Cloud-based transcription (internet required)
* Uses `ScriptProcessorNode` (stable but deprecated)

---

## 🧩 CI / GitHub Workflows

A minimal CI workflow is included to verify frontend builds.

Desktop installers are built locally and published via **GitHub Releases**.

---

## 👤 Author

**Nadar Nawas**
BTech Computer Science

---

## 🏁 Final Notes

This project is **desktop-first**.
The web run mode exists **only for development convenience**.