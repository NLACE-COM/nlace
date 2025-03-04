
/**
 * Utilities for detecting and processing different content types in chat messages
 */

/**
 * Checks if the content contains Markdown formatting
 */
export const containsMarkdown = (content: string): boolean => {
  // Check for common markdown patterns (headers, code blocks, lists, etc.)
  return /[#*`>_~-]/.test(content) || 
    content.includes('```') || 
    content.includes('<div');
};

/**
 * Extracts URLs from a text string
 */
export const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

/**
 * Determines the media type of a URL
 */
export const getUrlMediaType = (url: string): 'image' | 'video' | 'audio' | 'youtube' | 'link' => {
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
    return 'image';
  } else if (/\.(mp4|webm|ogg)$/i.test(url)) {
    return 'video';
  } else if (/\.(mp3|wav)$/i.test(url)) {
    return 'audio';
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  return 'link';
};

/**
 * Extracts YouTube video ID from a YouTube URL
 */
export const extractYoutubeVideoId = (url: string): string | null => {
  let videoId: string | null = null;
  
  try {
    if (url.includes('youtube.com')) {
      const parsedUrl = new URL(url);
      videoId = parsedUrl.searchParams.get('v');
    } else if (url.includes('youtu.be')) {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split('/');
      videoId = pathSegments[1] || null;
    }
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
  }
  
  return videoId;
};
