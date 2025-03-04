
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

  return {
    searchQuery,
    setSearchQuery,
    filteredConversations,
  };
}
