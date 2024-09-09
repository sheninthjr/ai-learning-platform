'use client';

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { generateQuestions } from "../hooks/generateQuestions";

interface SearchbarProps {
  onSearch: (term: string) => void;
}

export function Searchbar({ onSearch }: SearchbarProps) {
  const [topics, setTopics] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (topics.trim()) {
      setLoading(true);
      setError(null);
      try {
        const questions = await generateQuestions("solana");
        if (questions.length > 0) {
          alert(questions.join('\n'));
        } else {
          alert('No questions generated.');
        }
        onSearch(topics);
      } catch (err) {
        console.error('Error while generating questions:', err);
        setError('Failed to generate questions. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        style={{ background: '#27272A' }}
        className="p-3 text-white font-bold border-none rounded-lg w-96 focus:outline-none"
        placeholder="Search"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        className={`p-2 ${loading ? 'bg-gray-600' : 'bg-slate-900'} text-white font-semibold rounded-lg shadow-md hover:${loading ? '' : 'bg-slate-800'} transition-colors duration-300 flex items-center justify-center`}
        onClick={handleSearch}
        disabled={loading}
      >
        <CiSearch size={24} />
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
