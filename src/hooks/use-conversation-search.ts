
import { useState, useEffect, useMemo } from 'react';
import { Conversation } from '@/types/chat';

export function useConversationSearch(conversations: Conversation[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>(conversations);

  // Filter conversations whenever the search query or conversations list changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = conversations.filter(
      (conversation) =>
        // Search in title
        conversation.title.toLowerCase().includes(query) ||
        // Search in preview
        conversation.preview.toLowerCase().includes(query) ||
        // Search in messages content
        conversation.messages.some((message) =>
          message.content.toLowerCase().includes(query)
        )
    );

    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  // Provide a way to clear the search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Memoize the search result stats
  const searchStats = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    return {
      total: conversations.length,
      filtered: filteredConversations.length,
      hasResults: filteredConversations.length > 0
    };
  }, [searchQuery, conversations, filteredConversations]);

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredConversations,
    searchStats
  };
}
