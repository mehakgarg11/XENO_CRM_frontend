import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // URL se 'token' parameter nikalte hain
    const token = searchParams.get('token');

    if (token) {
      // Token ko localStorage mein save karte hain
      localStorage.setItem('token', token);
      
      // User ko admin dashboard par bhejte hain
      navigate('/admin');
    } else {
      // Agar token nahi mila, to user ko login page par bhejte hain
      console.error("Google auth token not found in URL.");
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Yeh effect sirf ek baar chalta hai jab component load hota hai

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">Finalizing your login...</p>
        <p className="text-gray-500">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
