import { CATEGORIES_ACTIONS_TYPE } from "./category.types";

const INITIAL_STATE = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTIONS_TYPE.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTIONS_TYPE.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTIONS_TYPE.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};
