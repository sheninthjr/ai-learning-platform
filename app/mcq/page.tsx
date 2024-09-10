'use client';

import { useState, useEffect } from 'react';
import { generateMcqQuestions } from "../hooks/mcqQuestions";

interface McqData {
    question: string;
    options: string[];
    answer: string;
}

export default function Mcq() {
    const [mcqData, setMcqData] = useState<McqData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});
    const [feedback, setFeedback] = useState<{ [key: number]: string | null }>({});

    useEffect(() => {
        const resKey = `test-data-${localStorage.getItem("topics")}`;
        const storedData = sessionStorage.getItem(resKey);

        if (storedData) {
            generateMcqQuestions(storedData)
                .then((data: any) => {
                    const parsedData = parseMcqQuestions(data);
                    setMcqData(parsedData);
                })
                .catch((err) => {
                    console.error('Error fetching MCQ questions:', err);
                    setError('Failed to fetch MCQ questions');
                });
        } else {
            setError('No data found in session storage.');
        }
    }, []);

    const handleOptionClick = (questionIndex: number, option: string) => {
        const correctAnswer = mcqData[questionIndex].answer;
        const isCorrect = option.trim() === correctAnswer.trim();

        setSelectedOptions((prev) => ({ ...prev, [questionIndex]: option }));
        setFeedback((prev) => ({
            ...prev,
            [questionIndex]: isCorrect
                ? 'Correct!'
                : `Incorrect. Correct answer is: ${correctAnswer}`
        }));
    };

    return (
        <div className="bg-black min-h-screen text-gray-200 p-8">
            <h1 className="text-3xl font-bold mb-6">Test Your Knowledge</h1>
            {error && <p className="text-red-400 text-lg mb-4">{error}</p>}
            {mcqData.length === 0 && !error && <p className="text-gray-400">Loading...</p>}
            {mcqData.length > 0 && (
                <div className="space-y-6">
                    {mcqData.map((mcq, index) => (
                        <div key={index} className="bg-slate-800 p-4 rounded-lg shadow-md">
                            <p className="text-lg font-semibold mb-2">Q{index + 1}. {mcq.question}</p>
                            <ul className="list-disc pl-6 mb-2">
                                {mcq.options.map((option, i) => (
                                    <li key={i} className="mb-1">
                                        <button 
                                            onClick={() => handleOptionClick(index, option)}
                                            className={`w-full text-left p-2 rounded ${selectedOptions[index] === option ? (option === mcq.answer ? 'bg-green-600' : 'bg-red-600') : 'bg-gray-700'}`}
                                        >
                                            {option}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {feedback[index] && (
                                <p className={`font-medium ${feedback[index].startsWith('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                                    {feedback[index]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


function parseMcqQuestions(inputString: string): McqData[] {
    const questionBlocks = inputString.split(/\d+\.\s/).slice(1); 

    return questionBlocks.map(block => {
        const [questionWithOptions, answerLine] = block.split(/Answer:/);
        if (!questionWithOptions || !answerLine) return null;
        const optionsMatch = questionWithOptions.match(/a\)\s([^\n]*)\s*b\)\s([^\n]*)\s*c\)\s([^\n]*)\s*d\)\s([^\n]*)/);
        if (!optionsMatch) return null;
        const options = [
            optionsMatch[1].trim(),
            optionsMatch[2].trim(),
            optionsMatch[3].trim(),
            optionsMatch[4].trim()
        ];
        const questionText = questionWithOptions.replace(/a\)\s[^\n]*\s*b\)\s[^\n]*\s*c\)\s[^\n]*\s*d\)\s[^\n]*/, '').trim();
        const answer = options.find(option => answerLine.trim().includes(option)) || '';

        return {
            question: questionText,
            options: options,
            answer: answer
        };
    }).filter(Boolean) as McqData[];
}
