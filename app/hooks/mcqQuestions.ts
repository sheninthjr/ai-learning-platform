import axios from 'axios';
import { GEMINI_API_KEY } from '../config';

export async function generateMcqQuestions(query: string) {
  try {
    const data = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": `Generate a set of multiple-choice questions nearly 10 with four options and a correct answer based on the following content: "${query}"`
            }
          ]
        }
      ]
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);
    const candidates = response.data.candidates as { content: { parts: { text: string }[] } }[];
    
    if (candidates && candidates.length > 0) {
      const rawText = candidates[0].content.parts.map(part => part.text).join('');
      let cleanedText = rawText
        .replace(/```json\n/g, '') 
        .replace(/\n```/g, '')
        .replace(/```.*\n/g, '')
        .replace(/(\*\*|__|~~|`|[\*\_\~])/g, '')
        .trim();
      cleanedText = cleanedText.replace(/#.*\n/g, '');
      return cleanedText;
    } else {
      console.log("No candidates generated.");
      return [];
    }
  } catch (error: any) {
    console.error('Error while generating MCQ questions:', error.response?.data || error.message);
    return [];
  }
}
