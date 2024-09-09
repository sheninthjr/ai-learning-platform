'use client'
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { VideoCard } from "./components/VideoCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-black h-screen">
      <Navbar onSearch={handleSearch} />
      <div className="pt-16">
        <VideoCard topics={searchTerm} />
      </div>
    </div>
  );
}

