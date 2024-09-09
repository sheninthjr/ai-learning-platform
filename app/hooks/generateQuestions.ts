import axios from 'axios';
import { GEMINI_API_KEY } from '../config';

export async function generateQuestions(query: string) {
  try {
    const data = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": `Please generate a comprehensive step-by-step learning guide on ${query}, formatted as an array of questions. Each question should be clear, relevant, and designed to build understanding progressively. The array should include approximately 50 questions, covering various aspects of the subject in detail. The array should only include questions, without any additional symbols, special characters, or extraneous information. The questions should be provided in plain text within the array, with each question as a separate string element in the array. The format of the response should be a JSON array where each element is a question string, like this: ["What is the basic concept and importance?", "What are the core components and architecture?", "How do I set up the development environment?", "What are the main functionalities and how do I implement them?", "How can I optimize performance and ensure best practices?", ...]`
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
    
    const contentArray = candidates.map(candidate =>
      candidate.content.parts.map(part => part.text).join(' ')
    );
    const allQuestionsText = contentArray[0];
    const cleanedText = allQuestionsText
      .replace(/^\[|\]$/g, '')
      .replace(/\\\"/g, '"')
      .replace(/```json\n|\n```/g, '') 
      .trim();
    const questions = cleanedText
      .split(/,(?=\s*"[^"]*")/) 
      .map(question => question
        .replace(/^"|"$/g, '')
        .trim()
      )
      .filter(question => question.length > 0);
    return questions;
  } catch (error) {
    console.error('Error while generating questions:', error);
    return [];
  }
}
