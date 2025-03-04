
import React from 'react';
import { Image, Play, Volume2 } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender, timestamp }) => {
  // Función simple para convertir enlaces en elementos clicables
  const formatText = (text: string) => {
    // Dividir por líneas para manejar saltos
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Expresión regular para detectar URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      
      // Si la línea está vacía, devolver un salto de línea
      if (!line.trim()) {
        return <br key={`br-${lineIndex}`} />;
      }
      
      // Dividir la línea por URLs
      const parts = line.split(urlRegex);
      const matches = line.match(urlRegex) || [];
      
      // Combinar partes con enlaces cuando corresponda
      const formattedParts = parts.map((part, partIndex) => {
        // Si esta parte coincide con una URL, convertirla en un enlace
        if (matches.includes(part)) {
          // Comprobar si es una imagen, video o audio
          if (/\.(jpg|jpeg|png|gif|webp)$/i.test(part)) {
            return (
              <div key={`img-${lineIndex}-${partIndex}`} className="my-2">
                <img src={part} alt="Imagen" className="max-w-full rounded" />
              </div>
            );
          } else if (/\.(mp4|webm|ogg)$/i.test(part)) {
            return (
              <div key={`video-${lineIndex}-${partIndex}`} className="my-2">
                <video className="w-full rounded" controls>
                  <source src={part} />
                  Tu navegador no soporta el tag de video.
                </video>
              </div>
            );
          } else if (/\.(mp3|wav)$/i.test(part)) {
            return (
              <div key={`audio-${lineIndex}-${partIndex}`} className="my-2 flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <audio controls className="h-8">
                  <source src={part} />
                  Tu navegador no soporta el tag de audio.
                </audio>
              </div>
            );
          } else if (part.includes('youtube.com') || part.includes('youtu.be')) {
            // Extract YouTube video ID
            let videoId: string | null = null;
            
            try {
              if (part.includes('youtube.com')) {
                const url = new URL(part);
                videoId = url.searchParams.get('v');
              } else if (part.includes('youtu.be')) {
                const url = new URL(part);
                const pathSegments = url.pathname.split('/');
                videoId = pathSegments[1] || null;
              }
            } catch (error) {
              console.error("Error parsing YouTube URL:", error);
            }
              
            if (videoId) {
              return (
                <div key={`yt-${lineIndex}-${partIndex}`} className="my-2">
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
            
            // If we couldn't extract the video ID, return a normal link
            return (
              <a 
                key={`link-${lineIndex}-${partIndex}`}
                href={part} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {part}
              </a>
            );
          }
          
          // Normal link
          return (
            <a 
              key={`link-${lineIndex}-${partIndex}`}
              href={part} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {part}
            </a>
          );
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

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          sender === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}
      >
        <div className="chat-message-content">
          {formatText(content)}
        </div>
        <div 
          className={`text-xs mt-1 ${
            sender === 'user' 
              ? 'text-primary-foreground/70' 
              : 'text-muted-foreground'
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
