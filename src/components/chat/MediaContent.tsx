
import React from 'react';
import { extractYoutubeVideoId } from '@/utils/contentUtils';

// Individual media components
import ImageMedia from './media/ImageMedia';
import VideoMedia from './media/VideoMedia';
import AudioMedia from './media/AudioMedia';
import YoutubeMedia from './media/YoutubeMedia';
import LinkMedia from './media/LinkMedia';

interface MediaContentProps {
  url: string;
  mediaType: 'image' | 'video' | 'audio' | 'youtube' | 'link';
  index: number;
}

const MediaContent: React.FC<MediaContentProps> = ({ url, mediaType, index }) => {
  switch (mediaType) {
    case 'image':
      return <ImageMedia url={url} index={index} />;
      
    case 'video':
      return <VideoMedia url={url} index={index} />;
      
    case 'audio':
      return <AudioMedia url={url} index={index} />;
      
    case 'youtube':
      return <YoutubeMedia url={url} index={index} />;
      
    case 'link':
    default:
      return <LinkMedia url={url} index={index} />;
  }
};

export default MediaContent;
