import { ThunkAction } from 'redux-thunk';

import { FeedInfo } from '../@types/FeedInfo';
import { TypeRootReducer } from '../store/store';
import { sleep } from '../utils/sleep';

// 피드 목록 조회하기

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST';
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS';
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE';

export const getFeedListRequest = () => ({ type: GET_FEED_LIST_REQUEST });

export const getFeedListSuccess = (list: FeedInfo[]) => ({
  type: GET_FEED_LIST_SUCCESS,
  list,
});

export const getFeedListFailure = () => ({
  type: GET_FEED_LIST_FAILURE,
});

export const getFeedList = (): TypeFeedListThunkAction => async dispatch => {
  dispatch(getFeedListRequest());

  await sleep(500);

  dispatch(
    getFeedListSuccess([
      {
        id: 'ID_03',
        content: 'CONTENT_01',
        writer: {
          name: 'WRITER_NAME_01',
          uid: 'WRITER_UID_01',
        },
        imageUrl: 'IMAGE_URL_01',
        likeHistory: ['UID_01', 'UID_02', 'UID_03'],
        createdAt: new Date().getTime(),
      },
      {
        id: 'ID_02',
        content: 'CONTENT_02',
        writer: {
          name: 'WRITER_NAME_02',
          uid: 'WRITER_UID_02',
        },
        imageUrl: 'IMAGE_URL_02',
        likeHistory: ['UID_02', 'UID_02', 'UID_03'],
        createdAt: new Date().getTime(),
      },
      {
        id: 'ID_03',
        content: 'CONTENT_03',
        writer: {
          name: 'WRITER_NAME_03',
          uid: 'WRITER_UID_03',
        },
        imageUrl: 'IMAGE_URL_03',
        likeHistory: ['UID_03'],
        createdAt: new Date().getTime(),
      },
    ])
  );
};

// 피드 추가하기

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST';
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS';
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE';

export const createFeedRequest = () => ({ type: CREATE_FEED_REQUEST });

export const createFeedSuccess = (item: FeedInfo) => ({
  type: CREATE_FEED_SUCCESS,
  item,
});

export const createFeedFailure = () => ({
  type: CREATE_FEED_FAILURE,
});

export const createFeed =
  (item: Omit<FeedInfo, 'id' | 'writer' | 'createdAt' | 'likeHistory'>): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(createFeedRequest());

    const createdAt = new Date().getTime();
    const userInfo = getState().userInfo.userInfo;

    await sleep(200);

    dispatch(
      createFeedSuccess({
        id: 'ID-010',
        content: item.content,
        writer: {
          name: userInfo?.name ?? 'Unknown',
          uid: userInfo?.uid ?? 'Unknown',
        },
        imageUrl: item.imageUrl,
        likeHistory: [],
        createdAt,
      })
    );
  };

// 피드 좋아요 하기

export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST';
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS';
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE';

export const favoriteFeedRequest = () => ({ type: FAVORITE_FEED_REQUEST });

export const favoriteFeedSuccess = (feedId: FeedInfo['id']) => ({
  type: FAVORITE_FEED_SUCCESS,
  feedId,
});

export const favoriteFeedFailure = () => ({
  type: FAVORITE_FEED_FAILURE,
});

export const favoriteFeed =
  (item: FeedInfo): TypeFeedListThunkAction =>
  async dispatch => {
    dispatch(favoriteFeedRequest());

    await sleep(200);

    dispatch(favoriteFeedSuccess(item.id));
  };

export type TypeFeedListThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  TypeFeedListActions
>;

export type TypeFeedListActions =
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>;
