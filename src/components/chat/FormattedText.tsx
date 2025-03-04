
import React from 'react';
import { extractUrls, getUrlMediaType } from '@/utils/contentUtils';
import MediaContent from './MediaContent';

interface FormattedTextProps {
  content: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ content }) => {
  // Function to convert links to clickable elements
  const formatText = (text: string) => {
    // Split by lines to handle line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // If the line is empty, return a line break
      if (!line.trim()) {
        return <br key={`br-${lineIndex}`} />;
      }
      
      // Find all URL matches in the line
      const matches = extractUrls(line);
      
      // If no URLs in the line, return the line as is
      if (matches.length === 0) {
        return <div key={`line-${lineIndex}`} className="mb-2">{line}</div>;
      }
      
      // Split the line by URLs
      const parts = line.split(/(https?:\/\/[^\s]+)/g);
      
      // Combine parts with links when appropriate
      const formattedParts = parts.map((part, partIndex) => {
        // Check if this part is a URL (matched in our regex)
        const isUrl = matches.includes(part);
        
        if (isUrl) {
          const mediaType = getUrlMediaType(part);
          return <MediaContent key={`media-${lineIndex}-${partIndex}`} url={part} mediaType={mediaType} index={partIndex} />;
        }
        
        // Normal text
        return <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>;
      });
      
      return (
        <div key={`line-${lineIndex}`} className="mb-2">
          {formattedParts}
        </div>
      );
    });
  };

  return <>{formatText(content)}</>;
};

export default FormattedText;
