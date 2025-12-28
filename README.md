# Clueso.io Clone

A functional single-page clone of Clueso.io built to demonstrate product understanding, full-stack thinking, and clean engineering practices.

This project focuses on replicating Clueso’s core workflows and user experience rather than pixel-perfect UI.

---

## 🚀 Project Overview

The Clueso.io Clone allows users to:
- Sign up and log in
- Access a central dashboard
- Submit and manage product feedback
- Generate AI-style insights with visual indicators

The application is intentionally built as a Single Page Application (SPA) to keep execution simple and evaluation-friendly.

---

## 🧩 Core Features Implemented

### 1️⃣ User Onboarding & Authentication
- Login and registration flow
- Forgot password functionality
- Session persistence using localStorage
- Logout button positioned at the top-right corner

### 2️⃣ Dashboard Experience
- Clean SaaS-style dashboard layout
- Navigation with dark mode toggle
- Interactive cards and hover effects

### 3️⃣ Feedback Collection Flows
- Feedback submission form
- Feedback history display
- Sentiment classification (Positive / Neutral / Negative)

### 4️⃣ AI-Powered Insights (Mocked)
- AI insights generation button
- Sentiment summary output
- Graph meter visualizing feedback distribution

---

## 🧱 Architecture Overview

Single Page Application

Browser (HTML + CSS + JavaScript)  
→ Client-side state management  
→ Mock AI logic and data persistence

No external database or authentication service is used. This is a deliberate design choice for assignment clarity.

---

## 🛠 Tech Stack

- HTML5
- CSS3 (animations & hover effects)
- JavaScript (Vanilla)
- Node.js (local server)
- localStorage (data persistence)

---

## ⚙️ Setup & Run Instructions

### 1. Install Dependencies
```bash
npm install
