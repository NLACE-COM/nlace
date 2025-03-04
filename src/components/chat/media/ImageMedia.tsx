
import React from 'react';

interface ImageMediaProps {
  url: string;
  index: number;
}

const ImageMedia: React.FC<ImageMediaProps> = ({ url, index }) => {
  return (
    <div key={`img-${index}`} className="my-2">
      <img src={url} alt="Media content" className="max-w-full rounded" />
    </div>
  );
};

export default ImageMedia;
