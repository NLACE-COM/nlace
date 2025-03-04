
import React from 'react';
import { Volume2 } from 'lucide-react';
import { extractYoutubeVideoId } from '@/utils/contentUtils';

interface MediaContentProps {
  url: string;
  mediaType: 'image' | 'video' | 'audio' | 'youtube' | 'link';
  index: number;
}

const MediaContent: React.FC<MediaContentProps> = ({ url, mediaType, index }) => {
  switch (mediaType) {
    case 'image':
      return (
        <div key={`img-${index}`} className="my-2">
          <img src={url} alt="Imagen" className="max-w-full rounded" />
        </div>
      );
      
    case 'video':
      return (
        <div key={`video-${index}`} className="my-2">
          <video className="w-full rounded" controls>
            <source src={url} />
            Tu navegador no soporta el tag de video.
          </video>
        </div>
      );
      
    case 'audio':
      return (
        <div key={`audio-${index}`} className="my-2 flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          <audio controls className="h-8">
            <source src={url} />
            Tu navegador no soporta el tag de audio.
          </audio>
        </div>
      );
      
    case 'youtube':
      const videoId = extractYoutubeVideoId(url);
      if (videoId) {
        return (
          <div key={`yt-${index}`} className="my-2">
            <iframe 
              className="w-full rounded"
              height="200"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      // Fallback to regular link if YouTube parsing failed
      return (
        <a 
          key={`link-${index}`}
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </a>
      );
      
    case 'link':
    default:
      return (
        <a 
          key={`link-${index}`}
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </a>
      );
  }
};

export default MediaContent;
