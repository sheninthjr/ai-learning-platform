'use client';

import { useEffect, useState } from 'react';
import { getVideos } from '../actions/getVideos';
import Modal from './Modal';
import { generateQuestions } from '../hooks/generateQuestions';

interface VideoCardProps {
  topics: string;
}

export function VideoCard({ topics: initialTopics }: VideoCardProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [topics, setTopics] = useState<string | null>(initialTopics || null);

  const twoDaysInMs = 2 * 24 * 3600 * 1000;

  useEffect(() => {
    if (!initialTopics) {
      const storedTopics = localStorage.getItem("topics");
      if (storedTopics) {
        setTopics(storedTopics);
      }
    } else {
      localStorage.setItem("topics", initialTopics);
      setTopics(initialTopics);
    }
  }, [initialTopics]);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const now = new Date().getTime();
        const sessionData = sessionStorage.getItem(`videos_${topics}`);
        const sessionTimestamp = sessionStorage.getItem(`videos_timestamp_${topics}`);

        if (sessionData && sessionTimestamp) {
          const dataAge = now - parseInt(sessionTimestamp, 10);
          if (dataAge < twoDaysInMs) {
            setVideos(JSON.parse(sessionData));
            setLoading(false);
            return;
          }
        }

        if (topics) {
          const questions = await generateQuestions(topics);
          let videoData: any[] = [];
          for (const question of questions) {
            const videosForQuestion = await getVideos(topics, question, 3);
            videoData = [...videoData, ...videosForQuestion];
          }
          setVideos(videoData);
          sessionStorage.setItem(`videos_${topics}`, JSON.stringify(videoData));
          sessionStorage.setItem(`videos_timestamp_${topics}`, now.toString());
        }
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

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return <div className="text-center text-xl text-white font-semibold pt-10">Loading videos...</div>;
  }

  return (
    <div className="flex justify-center items-center py-8 px-4 bg-black min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-max w-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className="max-w-sm bg-slate-950 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
            onClick={() => handleVideoClick(video.url)}
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
      {selectedVideo && topics && (
        <Modal videoUrl={selectedVideo} topics={topics} onClose={handleCloseModal} />
      )}
    </div>
  );
}
