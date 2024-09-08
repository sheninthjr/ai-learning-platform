'use client';

import React from 'react';

interface ModalProps {
  videoUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ videoUrl, onClose }) => {
  const getEmbedUrl = (url: string) => {
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

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
          <iframe
            src={embedUrl}
            title="Video Player"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;

