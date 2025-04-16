
import React from "react";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-realEstate-primary">Property Sense Chat</h1>
          <p className="text-gray-600 mt-2">
            Your AI assistant for property issues and tenancy questions
          </p>
        </div>
        
        <div className="h-[70vh]">
          <ChatInterface />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            This is a demonstration of a multi-agent real estate chatbot.
            It handles property issues (with image analysis) and tenancy questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
