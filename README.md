# 🧪 LabGuru  
### Virtual Hardware & Software Labs with AI Assistance

**LabGuru** is an **interactive virtual laboratory platform** designed for undergraduate engineering students to perform **hardware (Digital Logic / ADLD)** and **software (C programming)** experiments in a guided, simulation-based environment enhanced with AI assistance.

The platform reduces dependency on physical lab availability while significantly improving **conceptual understanding**, **debugging skills**, and **experiment clarity**.

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
  - Corrected code unlocked only after reviewing hints  
- **Software AI Chatbot** for:
  - Code explanation  
  - Debugging help  
  - Concept clarification  

---

## 🤖 AI Integration

- Powered by **Google Gemini 2.5 Flash**
- AI is used for:
  - C code analysis and correction  
  - Hardware experiment explanations  
  - Interactive chatbot conversations  
- Backend ensures:
  - Structured JSON responses  
  - Controlled hint unlocking  
  - Clean separation of UI and AI logic  

---

## 🧰 Tech Stack

### 🎨 Frontend
- React + TypeScript  
- Vite  
- Tailwind CSS  
- Framer Motion  
- Monaco Editor  
- ShadCN UI  

### 🛠 Backend
- Node.js  
- Express.js  
- Google Gemini API  

### ⚡ Simulation
- Falstad Circuit Simulator (iframe-based)

### 🚀 Deployment
- **Frontend:** Vercel  
- **Backend:** Node.js server (Render / Railway / similar)

---

## 📁 Project Structure

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
## ⚙️ Local Setup
### 1️⃣ Clone the Repository
```text
git clone https://github.com/<your-username>/labguru.git
cd labguru
```

### 2️⃣ Frontend Setup
```text
npm install
npm run dev
```
Frontend runs at:
http://localhost:8080

### 3️⃣ Backend Setup
```text
cd backend
npm install
```
Create a .env file inside backend/:
```text
GEMINI_API_KEY=your_api_key_here
```
Run backend:
```text
node index.js
```
Backend runs at:
http://localhost:5000
