
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLearningPlan = async (studentGoals: string, experienceLevel: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 4-week dance learning plan for a ${experienceLevel} level student with the following goals: ${studentGoals}. Provide the output in structured JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planName: { type: Type.STRING },
            weeks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  weekNumber: { type: Type.NUMBER },
                  focus: { type: Type.STRING },
                  exercises: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getAIFeedback = async (transcript: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The student just finished a dance session. Based on their activity transcript: "${transcript}", provide 3 encouraging tips for improvement.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Feedback Error:", error);
    return "Keep dancing! You're doing great.";
  }
};
