import React from "react";
import { Link } from "react-router-dom";
import { Shield, Zap, Brain, TrendingUp, Sparkles, Target, Users, Clock, ArrowRight } from "lucide-react";

const WhyChooseUs = () => {
   
    const features = [ { icon: <Zap size={32} />, title: "Lightning Fast", description: "Process millions of customer records and deliver campaigns in seconds, not hours.", color: "yellow", gradient: "from-yellow-500 to-amber-500" }, { icon: <Shield size={32} />, title: "Enterprise Security", description: "Bank-level security with end-to-end encryption and SOC 2 compliance.", color: "green", gradient: "from-emerald-500 to-green-500" }, { icon: <Brain size={32} />, title: "AI Powered", description: "Intelligent insights and recommendations powered by cutting-edge machine learning.", color: "purple", gradient: "from-purple-500 to-violet-500" }, { icon: <TrendingUp size={32} />, title: "Proven Results", description: "Average 3.2x higher engagement rates and 42% more conversions for our customers.", color: "blue", gradient: "from-blue-500 to-cyan-500" } ];
    const stats = [ { value: "98%", label: "Delivery Rate", icon: <Target size={20} />, color: "text-blue-600", bgColor: "bg-blue-100" }, { value: "3.2x", label: "Higher Engagement", icon: <Users size={20} />, color: "text-green-600", bgColor: "bg-green-100" }, { value: "42%", label: "More Conversions", icon: <TrendingUp size={20} />, color: "text-purple-600", bgColor: "bg-purple-100" }, { value: "24/7", label: "Support", icon: <Clock size={20} />, color: "text-orange-600", bgColor: "bg-orange-100" } ];


  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
       
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Xeno?</span>
            </h2>
        </div>

        
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <h3 className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
                  <p className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>

           
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-6">
                Join thousands of businesses already transforming their customer engagement
              </p>
            
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
