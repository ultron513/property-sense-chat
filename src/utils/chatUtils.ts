
import { Agent, AgentResponse } from "@/types/chat";

// This is a mock implementation that simulates AI responses
// In a real application, this would connect to an API
export const generateResponse = async (
  message: string,
  imageUrl: string | null,
  agent: Agent
): Promise<AgentResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple text matching for demo purposes
  // In real application, this would be replaced with proper NLP/AI responses
  const messageLower = message.toLowerCase();

  // Handle routing logic
  if (agent === "router") {
    // Determine which agent should handle based on message content
    if (imageUrl) {
      return {
        content: "I notice you've shared an image. Let me analyze any property issues in this photo.",
        agentType: "issues",
      };
    } else if (
      messageLower.includes("rent") ||
      messageLower.includes("tenant") ||
      messageLower.includes("landlord") ||
      messageLower.includes("lease") ||
      messageLower.includes("deposit") ||
      messageLower.includes("contract") ||
      messageLower.includes("notice") ||
      messageLower.includes("evict")
    ) {
      return {
        content: "I'll help you with your tenancy question.",
        agentType: "tenancy",
      };
    } else if (
      messageLower.includes("damage") ||
      messageLower.includes("issue") ||
      messageLower.includes("broken") ||
      messageLower.includes("leak") ||
      messageLower.includes("mold") ||
      messageLower.includes("mould") ||
      messageLower.includes("damp") ||
      messageLower.includes("problem")
    ) {
      return {
        content: "I'll help you identify and solve this property issue. It would be helpful if you could share an image of the problem.",
        agentType: "issues",
      };
    } else {
      // If unclear, ask for clarification
      return {
        content: "I can help with property issues or tenancy questions. Which would you like assistance with?",
        agentType: "router",
      };
    }
  }

  // Property Issues Agent responses
  if (agent === "issues") {
    if (imageUrl) {
      // Image analysis responses (simulated)
      if (messageLower.includes("wall") || messageLower.includes("damp") || messageLower.includes("mold") || messageLower.includes("mould")) {
        return {
          content: "From the image, I can see what appears to be mold or dampness on the wall. This is often caused by poor ventilation, water leaks, or high humidity. I recommend:\n\n1. Improve ventilation by opening windows regularly\n2. Use a dehumidifier to reduce moisture\n3. Check for any leaking pipes behind the wall\n4. Clean the affected area with a mold-removing solution\n\nIf the problem persists, you may need to consult a professional to identify the source of moisture.",
          agentType: "issues",
        };
      } else if (messageLower.includes("ceiling") || messageLower.includes("leak") || messageLower.includes("water")) {
        return {
          content: "The image shows water damage on your ceiling, likely from a leak above. This could be from:\n\n1. Plumbing issues in the unit above\n2. Roof damage allowing rainwater in\n3. Condensation buildup in the attic\n\nI recommend:\n- Place a bucket under any active drips\n- Contact your landlord immediately as this requires professional attention\n- Take photos to document the damage progression\n\nThis is not something you should attempt to fix yourself as it may involve structural issues.",
          agentType: "issues",
        };
      } else if (messageLower.includes("window") || messageLower.includes("draft") || messageLower.includes("draught")) {
        return {
          content: "The image shows issues with your window that could be causing drafts. I can see:\n\n1. Gaps in the window sealing\n2. Possible damage to the window frame\n\nTemporary solutions include:\n- Using weather stripping tape around the edges\n- Applying caulk to seal any visible gaps\n- Using a draft excluder or heavy curtains\n\nFor a permanent fix, the window may need to be repaired or replaced by your landlord.",
          agentType: "issues",
        };
      } else {
        // Generic image analysis response
        return {
          content: "Thank you for sharing this image. I can see there might be some property issues present. It appears there could be some damage or wear that needs attention. Could you provide more details about what specific concerns you have about what's shown in the image?",
          agentType: "issues",
        };
      }
    } else {
      // Text-only responses for property issues
      if (messageLower.includes("leak")) {
        return {
          content: "Leaks can cause significant damage if not addressed promptly. Here's what to do:\n\n1. If it's a pipe leak, turn off the water supply using the nearest shutoff valve\n2. Place containers to catch the water and prevent further damage\n3. Take photos for documentation\n4. Contact your landlord or property manager immediately\n\nCould you share an image of the leak to help me better assess the situation?",
          agentType: "issues",
        };
      } else if (messageLower.includes("mold") || messageLower.includes("mould")) {
        return {
          content: "Mold is a common issue in properties and can pose health risks. Here's my advice:\n\n1. Don't touch or disturb the mold\n2. Ensure good ventilation in the affected area\n3. Report it to your landlord as they have a responsibility to address it\n4. Document the extent of the mold with photos\n\nIf possible, please share an image so I can better assess the severity and type of mold.",
          agentType: "issues",
        };
      } else if (messageLower.includes("crack") || messageLower.includes("wall")) {
        return {
          content: "Cracks in walls can range from minor cosmetic issues to signs of structural problems. To help assess:\n\n1. Monitor if the crack is widening over time\n2. Check if the crack follows a pattern (horizontal, vertical, diagonal)\n3. See if there are multiple cracks in the same area\n\nMinor hairline cracks may just need cosmetic repair, but larger cracks (wider than 5mm) should be inspected by a professional. Could you share an image of the crack?",
          agentType: "issues",
        };
      } else {
        return {
          content: "I'd be happy to help with the property issue you're experiencing. To provide the most accurate advice, could you:\n\n1. Share more specific details about the problem\n2. Upload a photo of the issue if possible\n3. Mention how long the issue has been occurring\n\nThis will help me identify the cause and suggest appropriate solutions.",
          agentType: "issues",
        };
      }
    }
  }

  // Tenancy FAQ Agent responses
  if (agent === "tenancy") {
    if (messageLower.includes("evict") || messageLower.includes("eviction")) {
      return {
        content: "Regarding eviction, in most jurisdictions landlords must:\n\n1. Have a valid legal reason (such as non-payment, lease violations, or property damage)\n2. Provide written notice with specific timeframes (typically 30-90 days depending on circumstances)\n3. Obtain a court order before forcing a tenant to leave\n\nIllegal eviction tactics include changing locks, removing doors/windows, or shutting off utilities.\n\nFor more specific information, please let me know which country, state, or city you're located in, as tenancy laws vary by location.",
        agentType: "tenancy",
      };
    } else if (messageLower.includes("deposit") || messageLower.includes("security")) {
      return {
        content: "Regarding security deposits:\n\n1. Landlords must typically return deposits within 14-30 days after move-out (timeframe varies by location)\n2. Deductions are allowed for unpaid rent, damage beyond normal wear and tear, and cleaning if the unit was left in poor condition\n3. Landlords must usually provide an itemized list of deductions\n\nIf your landlord is withholding your deposit improperly:\n- Send a formal request letter citing relevant local laws\n- Consider small claims court if they don't respond\n- Contact local housing authority or tenant rights organization\n\nFor specific deposit laws in your area, please share your location.",
        agentType: "tenancy",
      };
    } else if (messageLower.includes("rent increase") || messageLower.includes("raise rent")) {
      return {
        content: "Regarding rent increases:\n\n1. For fixed-term leases, rent typically cannot be increased until the lease term ends, unless the lease specifically allows it\n2. For month-to-month tenancies, landlords usually must provide 30-60 days' notice (varies by location)\n3. Some jurisdictions have rent control or rent stabilization laws limiting how much rent can be increased\n4. Many locations require written notice for any increase\n\nIf you believe a rent increase violates your lease or local laws, review your lease terms and check with your local housing authority.\n\nFor more specific guidance, please share your location as rent increase regulations vary significantly.",
        agentType: "tenancy",
      };
    } else if (messageLower.includes("repair") || messageLower.includes("fix")) {
      return {
        content: "Regarding repairs and maintenance:\n\n1. Landlords are generally responsible for keeping the property in habitable condition including structural elements, plumbing, heating, and electrical systems\n2. The proper process for repairs usually involves:\n   - Notifying your landlord in writing about the issue\n   - Allowing reasonable time for repairs (varies by severity)\n   - Following up if repairs aren't made\n\n3. In many jurisdictions, if essential repairs aren't made, tenants may have remedies such as:\n   - Withholding rent (following specific legal procedures)\n   - Repair and deduct (fixing the issue yourself and deducting costs from rent)\n   - Breaking the lease without penalty in extreme cases\n\nThese options have specific legal requirements, so consult local tenant resources before proceeding.",
        agentType: "tenancy",
      };
    } else if (messageLower.includes("notice") || messageLower.includes("moving out") || messageLower.includes("vacate")) {
      return {
        content: "Regarding notice periods for moving out:\n\n1. Fixed-term leases: Generally, no notice is required if you're leaving at the end of the lease term, but many leases convert to month-to-month if no action is taken\n\n2. Month-to-month tenancies: Typically require 30 days' notice, but some locations require longer periods\n\n3. Proper notice usually must be:\n   - In writing\n   - Delivered by the rental due date to end tenancy the following month\n   - Include your move-out date\n\nBreaking a lease early usually requires paying rent until a new tenant is found or until the lease ends, unless you have legal grounds to terminate early (such as uninhabitable conditions).\n\nFor specific notice requirements in your area, please share your location.",
        agentType: "tenancy",
      };
    } else {
      return {
        content: "Thank you for your tenancy question. To provide the most accurate information, please:\n\n1. Let me know which specific aspect of tenancy law you're inquiring about (deposits, notice periods, repairs, etc.)\n2. Share your location (country, state, or city) as tenancy laws vary significantly by jurisdiction\n\nI'm here to help with information about tenant rights, landlord responsibilities, lease agreements, and rental processes.",
        agentType: "tenancy",
      };
    }
  }

  // Fallback response
  return {
    content: "I apologize, but I'm not sure how to help with that specific query. Could you provide more details or rephrase your question?",
    agentType: "router",
  };
};
