'use client'

import { useState } from "react";
import { VideoCard } from "./VideoCard";

export function Searchbar() {
  const [topics, setTopics] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (topics.trim()) {
      setSearchTerm(topics);
    }
  };

  return (
    <>
      <div className="flex flex-col pt-20">
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="p-2 text-black font-semibold rounded-lg w-96"
            placeholder="Search based on topics"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
          <button
            className="ml-4 p-2 bg-blue-500 text-white font-semibold rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {searchTerm && <VideoCard key={searchTerm} topics={searchTerm} />}
      </div>
    </>
  );
}

