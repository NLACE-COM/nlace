
import React from 'react';
import { Search, XCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ChatSidebarSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const ChatSidebarSearch: React.FC<ChatSidebarSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  clearSearch 
}) => {
  return (
    <div className="p-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar conversaciones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm border-gray-200 focus-visible:ring-gray-500"
        />
        {searchQuery && (
          <button 
            className="absolute right-2.5 top-2.5"
            onClick={clearSearch}
          >
            <XCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatSidebarSearch;
