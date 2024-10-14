import {
  CLIP_ITEM_RESET,
  CLIP_NEWS_ITEM,
  CLIPPED_TAB_FOCUS,
  GET_NEWS_LIST_FAILURE,
  GET_NEWS_LIST_REQUEST,
  GET_NEWS_LIST_SUCCESS,
} from '../actions/news';

const initialState = {
  favoriteNews: [],
  newsList: [],
  loading: false,
  isInitFocusTabOnce: false,
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_NEWS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        newsList: action.result,
      };

    case GET_NEWS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case CLIP_NEWS_ITEM: {
      const hasFavoriteList = state.favoriteNews.filter(item => item.link === action.newsItem.link);
      if (hasFavoriteList.length) {
        return {
          ...state,
          favoriteNews: state.favoriteNews.filter(item => item.link !== action.newsItem.link),
        };
      }

      return {
        ...state,
        favoriteNews: [...state.favoriteNews, action.newsItem],
      };
    }

    case CLIPPED_TAB_FOCUS:
      return {
        ...state,
        isInitFocusTabOnce: true,
      };

    case CLIP_ITEM_RESET:
      return {
        ...state,
        favoriteNews: action.savedItems,
      };
  }

  return { ...state };
};
