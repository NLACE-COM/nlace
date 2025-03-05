
import React from 'react';
import { Conversation } from '@/types/chat';

interface ChatItemProps {
  chat: Conversation;
  isActive: boolean;
  sidebarCollapsed: boolean;
  onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ 
  chat, 
  isActive, 
  sidebarCollapsed, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'hover:bg-gray-50 text-gray-700'
      } transition-colors`}
    >
      {sidebarCollapsed ? (
        <div className="flex justify-center">
          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-xs">
            {chat.title.charAt(0)}
          </span>
        </div>
      ) : (
        <div>
          <div className="font-medium truncate">{chat.title}</div>
          <div className="text-xs text-gray-600 truncate">
            {chat.preview}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {chat.timestamp} · {chat.model}
          </div>
        </div>
      )}
    </button>
  );
};

export default ChatItem;
