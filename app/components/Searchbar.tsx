
'use client';

import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { CiSearch } from "react-icons/ci";

export function Searchbar() {
  const [topics, setTopics] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (topics.trim()) {
      setSearchTerm(topics);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-center pb-4">
          <input
            type="text"
            style={{ background: '#27272A' }}
            className="p-3 text-white border-none focus:outline-none rounded-lg w-96"
            placeholder="Search"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="ml-2 p-2 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 transition-colors duration-300 flex items-center justify-center"
            onClick={handleSearch}
          >
            <CiSearch size={24} />
          </button>        </div>
        {searchTerm && <VideoCard key={searchTerm} topics={searchTerm} />}
      </div>
    </>
  );
}


