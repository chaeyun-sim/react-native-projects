import React, { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomLinkList } from 'src/states/atomLinkList';
import { getStorage } from 'src/utils/AsyncStorageUtils';

export const RecoilCustomPersist = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const setList = useSetRecoilState(atomLinkList);

  const loadData = useCallback(async () => {
    try {
      const data = await getStorage('MAIN/LINK_LIST');
      if (data) setList(data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoaded(true);
    }
  }, [setList]);

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
