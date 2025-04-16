
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";
import { Home, MessageSquare, HelpCircle } from "lucide-react";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === "user";
  
  const getAgentIcon = () => {
    switch (message.agentType) {
      case "issues":
        return <Home className="text-realEstate-primary" size={16} />;
      case "tenancy":
        return <HelpCircle className="text-realEstate-secondary" size={16} />;
      default:
        return <MessageSquare className="text-gray-500" size={16} />;
    }
  };

  const getAgentName = () => {
    switch (message.agentType) {
      case "issues":
        return "Property Issues Agent";
      case "tenancy":
        return "Tenancy FAQ Agent";
      default:
        return "Assistant";
    }
  };

  const getAgentAvatarFallback = () => {
    switch (message.agentType) {
      case "issues":
        return "PI";
      case "tenancy":
        return "TF";
      default:
        return "RA";
    }
  };

  const getAgentAvatarColor = () => {
    switch (message.agentType) {
      case "issues":
        return "bg-realEstate-primary text-white";
      case "tenancy":
        return "bg-realEstate-secondary text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <Avatar className={`w-8 h-8 ${getAgentAvatarColor()}`}>
          <AvatarFallback>{getAgentAvatarFallback()}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : ""}`}>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          {!isUser && (
            <>
              {getAgentIcon()}
              <span>{getAgentName()}</span>
            </>
          )}
          <span>{formatDistanceToNow(message.timestamp, { addSuffix: true })}</span>
        </div>
        
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? "bg-realEstate-primary text-white rounded-tr-none"
              : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
          }`}
        >
          {message.image && (
            <div className="mb-2">
              <img
                src={message.image}
                alt="Uploaded"
                className="max-w-full max-h-60 rounded object-cover"
              />
            </div>
          )}
          
          <div className="whitespace-pre-wrap">
            {message.content || ""}
          </div>
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8 bg-gray-200">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageItem;
