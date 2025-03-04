
import React from 'react';
import { Volume2 } from 'lucide-react';

interface AudioMediaProps {
  url: string;
  index: number;
}

const AudioMedia: React.FC<AudioMediaProps> = ({ url, index }) => {
  return (
    <div key={`audio-${index}`} className="my-2 flex items-center gap-2">
      <Volume2 className="h-4 w-4" />
      <audio controls className="h-8">
        <source src={url} />
        Tu navegador no soporta el tag de audio.
      </audio>
    </div>
  );
};

export default AudioMedia;
