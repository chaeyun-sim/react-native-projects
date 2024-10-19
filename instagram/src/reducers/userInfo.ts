import { FeedInfo } from '../@types/FeedInfo';
import { UserInfo } from '../@types/UserInfo';
import { TypeUserInfoActions } from '../actions/user';

export type TypeUserInfoReducer = {
  userInfo: UserInfo | null;
  myFeedList: FeedInfo[];
};

const defaultUserInfoState = {
  userInfo: null,
  myFeedList: [],
};

export const userInfoReducer = (
  state: TypeUserInfoReducer = defaultUserInfoState,
  _action: TypeUserInfoActions
) => {
  return {
    ...state,
  };
};
