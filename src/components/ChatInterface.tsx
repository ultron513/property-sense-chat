
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MessageItem from "./MessageItem";
import AgentToggle from "./AgentToggle";
import { Message, Agent } from "@/types/chat";
import { generateResponse } from "@/utils/chatUtils";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your real estate assistant. How can I help you today?",
      role: "assistant",
      agentType: "router",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentAgent, setCurrentAgent] = useState<Agent>("router");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      content: input,
      role: "user",
      timestamp: new Date(),
      image: imagePreview,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setSelectedImage(null);
    setImagePreview(null);

    try {
      // Determine which agent should handle the message
      // This is a simplified version - in a real app, we'd have more sophisticated routing
      const agentType = determineAgentType(input, !!imagePreview);
      
      // Generate response from the appropriate agent
      const response = await generateResponse(input, imagePreview, agentType);
      
      const responseMessage: Message = {
        id: Date.now().toString(),
        content: response.content,
        role: "assistant",
        agentType: response.agentType,
        timestamp: new Date(),
      };

      setCurrentAgent(response.agentType);
      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple function to determine agent type based on input content
  // In a real application, this would be more sophisticated
  const determineAgentType = (text: string, hasImage: boolean): Agent => {
    if (hasImage) {
      return "issues";
    }
    
    // Simple keyword-based routing
    const tenancyKeywords = [
      "rent", "lease", "landlord", "tenant", "deposit", "contract", "evict", 
      "notice", "agreement", "tenancy", "legal", "rights", "law"
    ];
    
    const issueKeywords = [
      "damage", "broken", "leak", "mold", "mould", "crack", "fix", "repair", 
      "issue", "problem", "not working", "water", "damp"
    ];
    
    const textLower = text.toLowerCase();
    
    const tenancyMatchCount = tenancyKeywords.filter(kw => textLower.includes(kw)).length;
    const issueMatchCount = issueKeywords.filter(kw => textLower.includes(kw)).length;
    
    if (tenancyMatchCount > issueMatchCount) {
      return "tenancy";
    } else if (issueMatchCount > tenancyMatchCount) {
      return "issues";
    }
    
    // If unclear or equal matches, default to router which will ask clarifying questions
    return "router";
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept image files
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Reset the file input value to allow selecting the same file again
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchAgent = (agent: Agent) => {
    setCurrentAgent(agent);
    
    const switchMessage: Message = {
      id: Date.now().toString(),
      content: agent === "issues" 
        ? "I've switched to the Property Issues Agent. You can upload photos of property issues, and I'll help identify problems and suggest solutions."
        : "I've switched to the Tenancy FAQ Agent. I can answer questions about rental agreements, tenant rights, landlord responsibilities, and more.",
      role: "assistant",
      agentType: agent,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, switchMessage]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm your real estate assistant. How can I help you today?",
        role: "assistant",
        agentType: "router",
        timestamp: new Date(),
      },
    ]);
    setCurrentAgent("router");
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="flex items-center justify-between p-4 bg-realEstate-primary text-white">
        <h1 className="text-xl font-bold">Real Estate Assistant</h1>
        <div className="flex items-center gap-2">
          <AgentToggle currentAgent={currentAgent} onSwitchAgent={switchAgent} />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearChat}
            className="text-white hover:bg-realEstate-secondary"
          >
            <RefreshCw size={18} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 animate-pulse p-3">
            <div className="w-2 h-2 bg-realEstate-secondary rounded-full animate-pulse-slow"></div>
            <div className="w-2 h-2 bg-realEstate-secondary rounded-full animate-pulse-slow" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-realEstate-secondary rounded-full animate-pulse-slow" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {imagePreview && (
        <div className="relative p-2 border-t">
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Upload preview" 
              className="h-16 w-auto rounded object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 bg-realEstate-dark text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="p-4 border-t flex gap-2 items-end">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleImageUploadClick}
          className="text-realEstate-dark"
          disabled={isLoading}
        >
          <Upload size={18} />
        </Button>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="flex-1 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={(!input.trim() && !selectedImage) || isLoading}
          className="bg-realEstate-secondary hover:bg-realEstate-primary"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
