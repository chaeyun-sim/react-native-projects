import { useRecoilState } from 'recoil';
import { atomLinkList } from 'src/states/atomLinkList';

export const useLinkList = () => {
  const [linkList, setLinkList] = useRecoilState(atomLinkList);

  const deleteLink = itemToDelete => {
    setLinkList(currentList => ({
      ...currentList,
      list: currentList.list.filter(item => item.createdAt === itemToDelete.createdAt),
    }));
  };

  return {
    linkList: linkList,
    setLinkList,
    deleteLink,
  };
};
