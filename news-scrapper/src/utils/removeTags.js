export const removeKeywordTag = str => {
  const removeTags = String(str)
    .replace(/&quot;/g, '')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<\/?b>/g, '');
  return removeTags;
};
