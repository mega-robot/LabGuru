# 🧪 LabGuru  
### Virtual Hardware & Software Labs with AI Assistance

**LabGuru** is an **interactive virtual laboratory platform** designed for undergraduate engineering students to perform **hardware (Digital Logic / ADLD)** and **software (C programming)** experiments in a guided, simulation-based environment enhanced with AI assistance.

The platform reduces dependency on physical lab availability while significantly improving **conceptual understanding**, **debugging skills**, and **experiment clarity**.

---

## 🌐 Live Demo

- **Frontend (Vercel):** https://lab-guru.vercel.app/
- **Backend API (Render):** https://labguru.onrender.com  

> ⚠️ The backend is an API-only server. Visiting the root URL may show `Cannot GET /`, which is expected.

---

## ✨ Key Features

### 🔌 Hardware Labs (Digital Logic / ADLD)
- Virtual **Digital Trainer Kit** using **Falstad Circuit Simulator**
- Structured lab manual for every experiment:
  - Aim  
  - Required ICs  
  - Truth tables  
  - Circuit / wiring diagrams  
- Supported experiments:
  - BCD → Excess-3 Code Converter  
  - Excess-3 → BCD Code Converter  
  - Full Adder & Full Subtractor  
  - 1-bit & 2-bit Comparator  
  - Binary ↔ Gray Code Converter  
  - Encoder & Decoder  
  - Master-Slave JK Flip-Flop  
  - Mod-N Up Counter  
  - Mod-N Down Counter  
- **Create My Own Circuit** mode for free experimentation
- **Hardware AI Chatbot** for:
  - IC explanations  
  - Truth table clarification  
  - Circuit working logic  
  - Common lab mistakes  

---

### 💻 Software Labs (C Programming)
- **Monaco Editor**–based code editor (VS Code–like experience)
- **AI-powered C code analysis**
- Detects:
  - Logical errors  
  - Runtime errors  
  - Common lab mistakes  
- **Progressive hint system**:
  - Hints revealed one-by-one  
  - Corrected code unlocked only after reviewing a minimum of 3 hints  
- **Software AI Chatbot** for:
  - Code explanation  
  - Debugging help  
  - Concept clarification  

---

## 🤖 AI Integration

- Powered by **Google Gemini 2.5 Flash**
- Used for:
  - C code analysis and correction  
  - Hardware experiment explanations  
  - Interactive chatbot conversations  
- Backend ensures:
  - Structured JSON responses  
  - Controlled hint unlocking  
  - Clean separation of UI and AI logic  

---

## 🏗 System Architecture

```text
Frontend (React + Vite on Vercel)
        |
        | REST API Calls
        v
Backend (Node.js + Express on Render)
        |
        | Secure AI Requests
        v
Google Gemini 2.5 Flash
```
---
### 📁 Project Structure
```text
LabGuru/
│
├── src/
│   ├── pages/
│   │   ├── HardwareLabs.tsx
│   │   └── SoftwareLabs.tsx
│   │
│   ├── components/
│   │   ├── hardware/
│   │   │   └── HardwareChatBot.tsx
│   │   │
│   │   └── software/
│   │       └── SoftwareChatBot.tsx
│   │
│   └── lib/
│       └── gemini.ts
│
├── backend/
│   └── index.js
│
├── public/
│   └── images/
│
├── .env
├── package.json
└── README.md
```
---
### 🔐 Environment Variables
Frontend (Vercel / Local)
Create a .env file in the project root:
```text
VITE_API_BASE_URL=https://labguru.onrender.com
```
Backend (Render / Local)
Create a .env file inside the backend/ directory:
```text
GEMINI_API_KEY=your_gemini_api_key_here
```
---
### ⚙️ Local Setup
### 1️⃣ Clone the Repository
```text
git clone https://github.com/mega-robot/LabGuru.git
cd LabGuru
```
### 2️⃣ Frontend Setup
```text
npm install
npm run dev
```
Frontend runs at:
```text
http://localhost:8080
```
Create .env in project root:
```text
VITE_API_BASE_URL=http://localhost:5000
```

### 3️⃣ Backend Setup
```text
cd backend
npm install
node index.js
```
Create .env inside backend/:
```text
GEMINI_API_KEY=your_gemini_api_key_here
```
Backend runs at:
```text
http://localhost:5000
```
---
### 🚀 Deployment Guide
## Frontend (Vercel)
1. Import GitHub repository into Vercel
2. Framework Preset: Vite
3. Build Command: npm run build
4. Output Directory: dist
5. Add Environment Variable:
```text
VITE_API_BASE_URL=https://labguru.onrender.com
```
6. Deploy

### Backend (Render)
1. Create a new Web Service
2. Root Directory: backend
3. Build Command: npm install
4. Start Command: node index.js
5. Add Environment Variable:
```text
GEMINI_API_KEY=your_gemini_api_key_here
```
6. Deploy
---
### 🔒 Security & Design Decisions
1. Gemini API key is never exposed to the frontend
2. All AI requests are routed through a secure backend
3. Frontend uses environment-based API routing
4. Backend validates and parses AI responses
5. CORS is handled server-side

---
### 🧪 How It Works
### Software Lab Flow
Student writes C code
Code is sent to backend /api/analyze
Gemini returns structured hints and corrected code
Hints unlock progressively
Chatbot provides conceptual explanations

### Hardware Lab Flow
Student selects an experiment
Circuit is simulated using Falstad
Experiment context is sent to backend
Hardware chatbot answers lab-specific questions
Custom circuit design is supported


---
### 🏁 Conclusion
LabGuru bridges the gap between theory and hands-on experimentation by combining virtual simulations with AI-powered guidance, making engineering labs more accessible, interactive, and effective.
