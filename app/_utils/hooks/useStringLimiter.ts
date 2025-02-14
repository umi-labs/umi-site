import { useMemo } from 'react';

const useStringLimiter = (text, limit, addEllipsis = true) => {
  return useMemo(() => {
    if (!text) return '';
    if (text.length > limit) {
      return addEllipsis
        ? text.substring(0, limit) + '...'
        : text.substring(0, limit);
    }
    return text;
  }, [text, limit, addEllipsis]);
};

export default useStringLimiter;
