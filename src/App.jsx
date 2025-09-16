import React from "react";
import { Routes, Route } from "react-router-dom";
import GoogleAuthCallback from './auth/GoogleAuthCallback';

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerData from './adminPanel/CustomerData';
// Pages
import Index from "./indexPage/Index";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";

// Admin Pages
import AdminDash from "./adminPanel/AdminDash";
import CampaignCreate from "./adminPanel/CampaignCreate";
import CampaignAnalytics from "./adminPanel/CampaignAnalytics";
import CampaignHistory from "./adminPanel/CampaignHistory";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          
         
          <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />

          {/* Admin (protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CampaignCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <CampaignAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/history"
            element={
              <ProtectedRoute>
                <CampaignHistory />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/customers"
  element={
    <ProtectedRoute>
      <CustomerData />
    </ProtectedRoute>
  }
/>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
                <h1 className="text-4xl font-bold text-red-500">404</h1>
                <p className="mt-2 text-gray-600">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
