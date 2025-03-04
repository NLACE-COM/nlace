
import React from 'react';
import { extractYoutubeVideoId } from '@/utils/contentUtils';
import LinkMedia from './LinkMedia';

interface YoutubeMediaProps {
  url: string;
  index: number;
}

const YoutubeMedia: React.FC<YoutubeMediaProps> = ({ url, index }) => {
  const videoId = extractYoutubeVideoId(url);
  
  if (!videoId) {
    // Fallback to regular link if YouTube parsing failed
    return <LinkMedia url={url} index={index} />;
  }
  
  return (
    <div key={`yt-${index}`} className="my-2">
      <iframe 
        className="w-full rounded"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeMedia;
