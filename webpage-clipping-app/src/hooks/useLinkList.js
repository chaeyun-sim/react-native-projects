import { useRecoilState } from 'recoil';
import { atomLinkList } from 'src/states/atomLinkList';

export const useLinkList = () => {
  const [linkList, setLinkList] = useRecoilState(atomLinkList);

  const deleteLink = itemToDelete => {
    setLinkList(currentList => {
      if (!Array.isArray(currentList)) return currentList;
      return currentList.filter(item => item.createdAt !== itemToDelete.createdAt);
    });
  };

  return {
    linkList: linkList,
    setLinkList,
    deleteLink,
  };
};
