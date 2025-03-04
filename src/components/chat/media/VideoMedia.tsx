
import React from 'react';

interface VideoMediaProps {
  url: string;
  index: number;
}

const VideoMedia: React.FC<VideoMediaProps> = ({ url, index }) => {
  return (
    <div key={`video-${index}`} className="my-2">
      <video className="w-full rounded" controls>
        <source src={url} />
        Tu navegador no soporta el tag de video.
      </video>
    </div>
  );
};

export default VideoMedia;
