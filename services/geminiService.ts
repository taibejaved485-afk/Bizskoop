
import { GoogleGenAI, Type } from "@google/genai";
import { VisaFormData, LicenseWizardData, AIResponse } from "../types.ts";

const SYSTEM_TONE = "You are a senior Malaysian Business Strategist at Bizskoop. Your tone is direct, authoritative, and bold. Focus on speed, efficiency, and zero-bullshit compliance. Use specific Malaysian terminology (SSM, ESD, MDEC, JTKSM).";

export const getVisaEligibility = async (data: VisaFormData): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Assess Malaysia Employment Pass (EP) eligibility. 
  Nationality: ${data.nationality}, Education: ${data.education}, Salary: ${data.monthlySalary} MYR, Exp: ${data.experienceYears}. 
  Provide a bold, decisive assessment based on ESD/MDEC current quotas.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_TONE + " Specifically evaluate for EP Category I, II, or III.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          assessment: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimatedTime: { type: Type.STRING }
              },
              required: ["title", "description", "estimatedTime"]
            }
          },
          disclaimer: { type: Type.STRING }
        },
        required: ["assessment", "recommendation", "steps", "disclaimer"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const getBusinessRoadmap = async (data: LicenseWizardData): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Create a hard-hitting business setup roadmap for ${data.industry} in ${data.location}. Activity: ${data.businessActivity}. Focus on SSM registration and specialized licensing (WRT, CIDB, DBKL).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_TONE + " Provide clear, actionable steps for a foreign-owned entity.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          assessment: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimatedTime: { type: Type.STRING }
              },
              required: ["title", "description", "estimatedTime"]
            }
          },
          disclaimer: { type: Type.STRING }
        },
        required: ["assessment", "recommendation", "steps", "disclaimer"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
