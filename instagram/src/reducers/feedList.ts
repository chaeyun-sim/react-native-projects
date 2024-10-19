import { FeedInfo } from '../@types/FeedInfo';
import { GET_FEED_LIST_SUCCESS, TypeFeedListActions } from '../actions/feed';

export type TypeFeedListReducer = {
  list: FeedInfo[];
};

const defaultFeedListState = {
  list: [],
};

export const feedListReducer = (
  state: TypeFeedListReducer = defaultFeedListState,
  action: TypeFeedListActions
) => {
  switch (action.type) {
    case GET_FEED_LIST_SUCCESS:
      return {
        ...state,
      };
  }

  return {
    ...state,
  };
};
