# Xeno CRM - An AI-Powered Mini CRM Platform

Xeno CRM is a modern, intelligent Mini CRM platform built as a hands-on assignment for the **SDE Internship position at Xeno**.  
This project demonstrates a real-world application of **customer segmentation, personalized campaign delivery, and intelligent insights** using a **MERN stack** and the **Google Gemini AI API**.

---

## 🚀 Live Demo & Video
- **Live Frontend:** [Link to your deployed Vercel/Netlify URL]  
- **Live Backend:** [Link to your deployed Render/Railway URL]  
- **Demo Video (7 mins):** [Link to your Loom/YouTube video]  

---

## ✨ Core Features

### 1. 🔐 Authentication
- **Secure Sign-up & Login:** Traditional email and password authentication with server-side validation and password hashing (`bcryptjs`).  
- **Google OAuth 2.0:** Seamless one-click login/signup powered by **Passport.js**.  
- **Protected Routes:** Secured with **JWT (JSON Web Tokens)**, ensuring only authenticated users can access the dashboard.  

### 2. 🎯 Dynamic Campaign Creation
- **Multi-Step UI:** Intuitive 4-step campaign creation process.  
- **Flexible Rule Builder:** Create complex audience segments with AND/OR logic.  
- **Audience Size Preview:** Instantly view how many customers a campaign will target.  

### 3. 🤖 AI-Powered Intelligence (Google Gemini)
- **AI Performance Summary:** Human-readable, AI-generated insights into business performance.  
- **AI Customer Persona Generator:** Generates fictional personas for target segments to improve empathy-driven marketing.  

### 4. 🚚 Campaign Delivery & Logging
- **Simulated Delivery:** Backend process mimicking real-world campaign dispatch.  
- **Dummy Vendor API:** Simulates ~90% success rate in message delivery.  
- **Delivery Receipt Webhook:** Updates campaign logs in **CommunicationLog collection** automatically.  

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React.js, Vite, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT, Passport.js (Google OAuth 2.0), bcryptjs  
- **AI Integration:** Google Gemini API (`@google/generative-ai`)  

### Prerequisites
- React.js (v18 or higher)  
- npm or yarn  
- MongoDB Atlas account (Free tier is fine)  
- Google Cloud account for API keys  

---

### 1. Clone the Repository
```bash
git clone [your-github-repo-link]
cd [your-project-folder]
