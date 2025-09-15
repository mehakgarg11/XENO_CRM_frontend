
 Xeno CRM - An AI-Powered Mini CRM Platform
Xeno CRM is a modern, intelligent Mini CRM platform built as a hands-on assignment for the SDE Internship position at Xeno. This project demonstrates a real-world application of customer segmentation, personalized campaign delivery, and intelligent insights using a MERN stack and the Google Gemini AI API.

🚀 Live Demo & Video
Live Frontend: [Link to your deployed Vercel/Netlify URL]

Live Backend: [Link to your deployed Render/Railway URL]

Demo Video (7 mins): [Link to your Loom/YouTube video]

✨ Core Features
This platform is packed with features designed to empower modern marketers.

1. 🔐 Authentication
Secure Sign-up & Login: Traditional email and password authentication with robust server-side validation and password hashing (bcryptjs).

Google OAuth 2.0: Seamless and secure one-click login/signup for users, handled by Passport.js.

Protected Routes: All administrative and sensitive pages are protected using JWT (JSON Web Tokens), ensuring only authenticated users can access the dashboard.

2. 🎯 Dynamic Campaign Creation
Multi-Step UI: An intuitive 4-step process guides the user through creating a campaign.

Flexible Rule Builder: Users can create complex audience segments by combining multiple rules. Conditions inside a group are combined with AND, while different groups are combined with OR.

Audience Size Preview: Before launching, users can see the exact number of customers their campaign will target.

3. 🤖 AI-Powered Intelligence (Powered by Google Gemini)
AI Performance Summary: The main dashboard doesn't just show numbers; it presents a human-readable, AI-generated summary of the business's current performance, offering actionable insights.

AI Customer Persona Generator: A unique and creative feature that analyzes the user-defined audience segment and generates a detailed, fictional customer persona. This helps marketers better understand and empathize with their target customers, leading to more effective campaigns.

4. 🚚 Campaign Delivery & Logging
Simulated Delivery: A robust backend process that simulates real-world campaign delivery.

Dummy Vendor API: A mock vendor API that simulates a ~90% success rate for message delivery.

Delivery Receipt Webhook: The vendor API hits a webhook on our server to update the status of each message in a dedicated CommunicationLog collection.

🛠️ Tech Stack & Architecture
This project is built with a modern, scalable, and efficient tech stack.

Frontend: React.js, Vite, Tailwind CSS, Axios

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT, Passport.js (for Google OAuth 2.0), bcryptjs

AI Integration: Google Gemini API (via @google/generative-ai)

Architecture Diagram
The application follows a standard client-server architecture.

[User's Browser: React Frontend on Vercel]
       |
       | (HTTPS API Requests with JWT)
       v
[Node.js Backend Server on Render]
       |
       |---[ Express.js Middleware (CORS, Auth, Session) ]
       |
       |---[ API Routes ]----------------------> [Controllers]
       |      | /api/auth                      -> authController.js
       |      | /customers, /campaigns, etc.   -> (Feature Controllers)
       |      | /api/ai                        -> aiController.js
       |
       |---[ Controllers ]
       |      | (Handles business logic)
       |      |
       |      |---(Calls Google Gemini API for AI features)
       |      |
       |      v
       |---[ Mongoose Models ]
       |      | (User, Customer, Campaign, etc.)
       |      v
[MongoDB Atlas Database]

Local Setup Instructions
To run this project on your local machine, please follow these steps.

Prerequisites
Node.js (v18 or higher)

npm or yarn

A free MongoDB Atlas account

A Google Cloud account to get API keys

1. Clone the Repository
git clone [your-github-repo-link]
cd [your-project-folder]

2. Backend Setup
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory and add the following variables:
MONGO_URI="Your MongoDB Atlas connection string"
JWT_SECRET="Your generated JWT secret key (use openssl rand -base64 32)"
SESSION_SECRET="Your generated session secret key (use openssl rand -base64 32)"
GEMINI_API_KEY="Your Google Gemini API Key from Google AI Studio"
GOOGLE_CLIENT_ID="Your Google OAuth Client ID from Google Cloud Console"
GOOGLE_CLIENT_SECRET="Your Google OAuth Client Secret from Google Cloud Console"
CLIENT_URL="http://localhost:5173"

# Start the server
npm run dev

The backend will be running at http://localhost:5000.

3. Frontend Setup
# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Create a .env file in the /client directory and add the following variable:
VITE_API_URL="http://localhost:5000"

# Start the client
npm run dev
 
