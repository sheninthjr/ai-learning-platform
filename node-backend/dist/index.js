"use strict";
// import axios from "axios";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const data = JSON.stringify({
//   "contents": [
//     {
//       "parts": [
//         {
//           "text": "Please generate a comprehensive step-by-step learning guide on a react, formatted as an array of questions. Each question should be clear, relevant, and designed to build understanding progressively. The array should include approximately 50 questions, covering various aspects of the subject in detail. The array should only include questions, without any additional symbols, special characters, or extraneous information. The questions should be provided in plain text within the array, with each question as a separate string element in the array. The format of the response should be a JSON array where each element is a question string, like this: [\"What is the basic concept and importance?\", \"What are the core components and architecture?\", \"How do I set up the development environment?\", \"What are the main functionalities and how do I implement them?\", \"How can I optimize performance and ensure best practices?\", ...]"
//         }
//       ]
//     }
//   ]
// });
// const apiKey = 'AIzaSyARYBH4-mkY'; 
// const config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
//   headers: { 
//     'Content-Type': 'application/json'
//   }, 
//   data: data
// };
// axios.request(config)
// .then((response) => {
//   const candidates = response.data.candidates as { content: { parts: { text: string }[] } }[];
//   const contentArray = candidates.map(candidate =>
//     candidate.content.parts.map(part => part.text).join(' ')
//   );
//   const allQuestionsText = contentArray[0];
//   const cleanedText = allQuestionsText
//     .replace(/^\[|\]$/g, '')
//     .replace(/\\\"/g, '"')
//     .replace(/```json\n|\n```/g, '') 
//     .trim();
//   const questions = cleanedText
//     .split(/,(?=\s*"[^"]*")/) 
//     .map(question => question
//       .replace(/^"|"$/g, '')
//       .trim()
//     )
//     .filter(question => question.length > 0);
//   console.log('Questions Array:', questions);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });
const express_1 = __importDefault(require("express"));
const youtube_caption_extractor_1 = require("youtube-caption-extractor");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/api/subtitles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoID, lang = 'en' } = req.query;
    if (typeof videoID !== 'string') {
        return res.status(400).json({ error: 'Invalid videoID parameter' });
    }
    try {
        const subtitles = yield (0, youtube_caption_extractor_1.getSubtitles)({ videoID, lang });
        const subtitleText = subtitles.map((subtitle) => subtitle.text).join(' ');
        res.status(200).json(subtitleText);
    }
    catch (error) {
        console.error('Error fetching subtitles:', error);
        res.status(500).json({ error: 'Failed to fetch subtitles' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
