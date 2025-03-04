
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Image, Play, Volume2 } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender, timestamp }) => {
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
          <ReactMarkdown
            className="whitespace-pre-line prose prose-sm max-w-none dark:prose-invert"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Style tables
              table: ({ node, ...props }) => (
                <div className="overflow-auto my-2">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />
              ),
              // Style code blocks
              code: ({ node, inline, className, children, ...props }) => (
                inline 
                  ? <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-sm" {...props}>{children}</code>
                  : <pre className="p-4 rounded bg-gray-100 dark:bg-gray-900 overflow-auto">
                      <code className={className} {...props}>{children}</code>
                    </pre>
              ),
              // Handle images, videos, and audio
              img: ({ node, ...props }) => (
                <div className="my-2">
                  <img className="max-w-full rounded" {...props} alt={props.alt || 'Image'} />
                </div>
              ),
              a: ({ node, href, children, ...props }) => {
                // Handle YouTube or video links
                if (href && (href.includes('youtube.com') || href.includes('youtu.be'))) {
                  return (
                    <div className="my-2">
                      <iframe 
                        className="w-full rounded"
                        height="200"
                        src={href.replace('watch?v=', 'embed/')}
                        title="Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                
                // Handle video files
                if (href && /\.(mp4|webm|ogg)$/.test(href)) {
                  return (
                    <div className="my-2">
                      <video className="w-full rounded" controls>
                        <source src={href} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                }
                
                // Handle audio files
                if (href && /\.(mp3|wav|ogg)$/.test(href)) {
                  return (
                    <div className="my-2 flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <audio controls className="h-8">
                        <source src={href} />
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  );
                }
                
                // Regular links
                return <a className="text-blue-500 hover:underline" href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
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
