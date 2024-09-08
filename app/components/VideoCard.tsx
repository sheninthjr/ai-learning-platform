
'use client';

import { useEffect, useState } from 'react';
import { getVideos } from '../actions/getVideos';

interface VideoCardProps {
  topics: string;
}

export function VideoCard({ topics }: VideoCardProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const videoData = await getVideos(topics, 50);
        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    if (topics) {
      fetchVideos();
    }
  }, [topics]);



  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading videos...</div>;
  }

  return (
    <div className="flex justify-center items-center py-8 bg-gray-900 px-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-max w-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className="max-w-sm bg-slate-950 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
          >
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
              <div className="font-bold text-lg text-white mb-2">{video.title}</div>
              <p className="text-gray-500 text-sm line-clamp-2">
                {video.description}
              </p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

