import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="!relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-32 px-6 md:px-20 min-h-screen flex items-center overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden">
       
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
       
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0zNiAzNGMwLTEuMS45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTItLjktMi0yek0yMCAzNGMwLTEuMS45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTItLjktMi0yek00IDM0YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTE2LTE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTE2IDBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnptLTE2LTE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
      </div>

      
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
      <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-purple-500 rounded-full animate-ping delay-1000"></div>

     
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">AI-Powered Customer Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Intelligent CRM for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Modern Businesses
            </span>
          </h1>
          
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg">
            Xeno helps you create targeted campaigns, understand your customers, and drive growth with AI-powered insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            
            
            <Link
              to="/admin"
              className="group relative inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>View Demo</span>
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
              </svg>
            </Link>
          </div>
          
          <div className="flex items-center gap-6 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Secure & reliable</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
           
            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden p-8">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-300 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-300 rounded-full opacity-20"></div>
              
              <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex flex-col items-center justify-center p-6 relative z-10">
              
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">AI Insights</div>
                    <div className="text-xs text-gray-500">Real-time analytics</div>
                  </div>
                </div>
             
                <div className="w-full bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-end justify-between h-16 gap-1">
                    {[20, 40, 60, 45, 80, 65, 90].map((height, index) => (
                      <div
                        key={index}
                        className="w-6 bg-gradient-to-t from-blue-400 to-purple-400 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
                
              
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 mb-1">Engagement</div>
                    <div className="font-bold text-blue-800">+42%</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-xs text-purple-600 mb-1">Conversion</div>
                    <div className="font-bold text-purple-800">+28%</div>
                  </div>
                </div>
                
              
                <div className="absolute inset-0 rounded-xl pointer-events-none">
                  <div className="absolute inset-4 border-2 border-blue-500/20 rounded-lg animate-ping"></div>
                  <div className="absolute inset-8 border-2 border-purple-300/30 rounded-lg animate-ping delay-300"></div>
                </div>
              </div>
            </div>
         
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 animate-float">
              <div className="w-full h-full bg-green-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 animate-float delay-1000">
              <div className="w-full h-full bg-orange-100 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
