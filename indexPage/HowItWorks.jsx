
import React from "react";
import { Target, Users, BarChart3, MessageSquare, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Target size={36} />,
      title: "Define Your Audience",
      description: "Create targeted segments using flexible rule-based criteria to reach the right customers.",
      color: "blue"
    },
    {
      icon: <MessageSquare size={36} />,
      title: "Craft Your Message",
      description: "Design personalized campaigns with AI-powered suggestions for optimal engagement.",
      color: "purple"
    },
    {
      icon: <Users size={36} />,
      title: "Launch Campaign",
      description: "Schedule and deploy your campaigns across multiple channels with a single click.",
      color: "green"
    },
    {
      icon: <BarChart3 size={36} />,
      title: "Analyze Results",
      description: "Track performance metrics and gain AI-powered insights to optimize future campaigns.",
      color: "orange"
    }
  ];

  const colorMap = {
    blue: { bg: "bg-blue-100", hover: "bg-blue-200", text: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
    purple: { bg: "bg-purple-100", hover: "bg-purple-200", text: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
    green: { bg: "bg-green-100", hover: "bg-green-200", text: "text-green-600", gradient: "from-green-500 to-green-600" },
    orange: { bg: "bg-orange-100", hover: "bg-orange-200", text: "text-orange-600", gradient: "from-orange-500 to-orange-600" }
  };

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
     
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-blue-50 to-transparent opacity-50"></div>
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-100 rounded-full opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-100 rounded-full opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Xeno</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your customer engagement with our simple yet powerful four-step process designed for maximum impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const color = colorMap[step.color];
            return (
              <div
                key={index}
                className="group relative text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                
                <div className={`w-20 h-20 ${color.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:${color.hover} transition-colors duration-300 relative`}>
                  <div className={color.text}>
                    {step.icon}
                  </div>
                
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                </div>
               
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {step.description}
                </p>
                
              
                <div className={`inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${color.gradient} text-white text-sm font-semibold rounded-full`}>
                  Step {index + 1}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"></div>
                )}
              </div>
            );
          })}
        </div>

     
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 md:p-16 relative overflow-hidden">
           
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full translate-y-16 -translate-x-16"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Customer Engagement?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of businesses that use Xeno to create meaningful customer connections and drive sustainable growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="px-8 py-4 bg-white text-gray-100 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;