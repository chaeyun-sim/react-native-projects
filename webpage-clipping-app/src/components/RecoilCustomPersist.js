import { useState, useEffect, useCallback } from 'react';
import { useLinkList } from 'src/hooks/useLinkList';
import { getStorage } from 'src/utils/AsyncStorageUtils';

export const RecoilCustomPersist = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setLinkList } = useLinkList();

  const loadData = useCallback(async () => {
    try {
      const data = await getStorage('MAIN/LINK_LIST');
      if (data) setLinkList(data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoaded(true);
    }
  }, [setLinkList]);

  useEffect(() => {
    let isMounted = true;

    if (!isLoaded) {
      loadData().then(() => {
        if (isMounted) setIsLoaded(true);
      });
    }

    return () => (isMounted = false);
  }, [isLoaded, loadData]);

  if (!isLoaded) return null;

  return children;
};
