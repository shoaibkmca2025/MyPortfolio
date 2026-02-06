
import { GoogleGenAI } from "@google/genai";
import { DEV_BIO } from "../constants";

// Helper function for portfolio chat agent following Google GenAI SDK guidelines
export const chatWithPortfolioAgent = async (userMessage: string, history: { role: string, content: string }[]) => {
  try {
    // Correct initialization with named parameter and direct process.env.API_KEY usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are the AI Assistant for "Shoaib Khatik", an aspiring Full-Stack Developer.
      Shoaib's Background: ${DEV_BIO}
      Key Skills: Python, Django, Java, C/C++, MySQL, MongoDB, JavaScript.
      Objective: Answer questions about Shoaib's education, internship at Dream Forge Technologies, and his project "ParentConnect". 
      Keep responses short and professional.
    `;

    // Use ai.models.generateContent directly with model and content configuration
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    // Access .text property directly as per modern SDK standards
    return response.text || "SYSTEM_ERROR: Empty response from core.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "OFFLINE_MODE: Neural connection interrupted. Please try again later.";
  }
};
