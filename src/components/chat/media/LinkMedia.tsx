
import React from 'react';

interface LinkMediaProps {
  url: string;
  index: number;
}

const LinkMedia: React.FC<LinkMediaProps> = ({ url, index }) => {
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
};

export default LinkMedia;
