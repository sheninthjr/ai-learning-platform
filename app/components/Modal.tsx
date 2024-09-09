'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface ModalProps {
  videoUrl: string;
  topics: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ videoUrl, topics, onClose }) => {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const oneWeekInMs = 7 * 24 * 3600 * 1000;
  
  useEffect(() => {
    const getEmbedUrl = async (url: string) => {
      const youtubeMatch = url.match(/(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (youtubeMatch) {
        try {
          const storedData = sessionStorage.getItem(`test-data-${topics}`);
          const storedTimestamp = sessionStorage.getItem(`test-data-timestamp-${topics}`);
          const now = new Date().getTime();
          if (storedData && storedTimestamp && now - parseInt(storedTimestamp) < oneWeekInMs) {
            const response = await axios.get(`http://localhost:3001/api/subtitles?videoID=${youtubeMatch[1]}`);
            const updatedData = storedData + " " + JSON.stringify(response.data);
            sessionStorage.setItem(`test-data-${topics}`, updatedData);
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
          } else {
            const response = await axios.get(`http://localhost:3001/api/subtitles?videoID=${youtubeMatch[1]}`);
            sessionStorage.setItem(`test-data-${topics}`, JSON.stringify(response.data));
            sessionStorage.setItem(`test-data-timestamp-${topics}`, now.toString());
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
          }
        } catch (error) {
          console.error('Error fetching subtitles:', error);
        }
      }
      return url;
    };
    getEmbedUrl(videoUrl).then((url) => setEmbedUrl(url));
  }, [videoUrl]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
      <div className="relative rounded-lg shadow-xl max-w-3xl w-full p-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-white font-bold text-4xl transition z-10"
          style={{ zIndex: 1000 }}
        >
          &times;
        </button>
        <div className="relative pb-[56.25%] z-0">
          {embedUrl && (
            <iframe
              src={embedUrl}
              title="Video Player"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
