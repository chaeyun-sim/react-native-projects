import { useState } from 'react';

export const useBookmark = (initialIsBookmarked: boolean) => {
  const [bookmark, setBookmark] = useState(initialIsBookmarked);
  const toggleBookmark = () => setBookmark(!bookmark);

  return {
    bookmark,
    toggleBookmark,
  };
};
