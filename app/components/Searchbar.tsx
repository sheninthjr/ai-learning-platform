
'use client';

import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchbarProps {
  onSearch: (term: string) => void;
}

export function Searchbar({ onSearch }: SearchbarProps) {
  const [topics, setTopics] = useState<string>('');

  const handleSearch = () => {
    if (topics.trim()) {
      onSearch(topics);
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
      />
      <button
        className="p-2 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 transition-colors duration-300 flex items-center justify-center"
        onClick={handleSearch}
      >
        <CiSearch size={24} />
      </button>
    </div>
  );
}

