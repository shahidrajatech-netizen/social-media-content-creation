
import { GoogleGenAI, Type } from "@google/genai";
import { Tone, SocialMediaContentResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-2.5-pro';
const imageModel = 'imagen-4.0-generate-001';

const contentSchema = {
  type: Type.OBJECT,
  properties: {
    linkedin: {
      type: Type.STRING,
      description: "Post content for LinkedIn: professional, detailed, and engaging for a business audience. Use 2-3 relevant hashtags."
    },
    twitter: {
      type: Type.STRING,
      description: "Post content for Twitter/X: short, punchy, and attention-grabbing. Under 280 characters. Use 2-3 relevant hashtags."
    },
    instagram: {
      type: Type.STRING,
      description: "Post content for Instagram: a visually-focused caption. Start with a hook, provide some value, and include 5-7 relevant hashtags."
    },
    imagePrompt: {
        type: Type.STRING,
        description: "A single, concise, and visually descriptive prompt under 100 characters that can be used to generate a relevant image for all posts. E.g., 'A sleek, minimalist photo of a developer's desk with a glowing laptop screen'."
    }
  },
  required: ["linkedin", "twitter", "instagram", "imagePrompt"]
};

export const generateSocialMediaContent = async (idea: string, tone: Tone): Promise<SocialMediaContentResponse> => {
  const prompt = `
    You are an expert social media manager. Based on the following idea and desired tone, generate content for LinkedIn, Twitter/X, and Instagram.

    Idea: "${idea}"
    Tone: "${tone}"

    For each platform, provide the text content. Also, provide a single, concise, and visually descriptive prompt that can be used to generate a relevant image for all posts.
    
    Return the response in the specified JSON format.
    `;

  try {
    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contentSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating social media content:", error);
    throw new Error("Failed to generate text content from Gemini API.");
  }
};

export const generateImageForPlatform = async (prompt: string, aspectRatio: '16:9' | '1:1'): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: imageModel,
            prompt: `cinematic, high detail, professional photography: ${prompt}`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");
    } catch (error) {
        console.error(`Error generating image for aspect ratio ${aspectRatio}:`, error);
        throw new Error(`Failed to generate image for aspect ratio ${aspectRatio}.`);
    }
};
