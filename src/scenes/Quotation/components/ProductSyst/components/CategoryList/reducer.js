import { GET_CATEGORY_LIST, SET_MAIN_CATEGORY, SET_SUB_CATEGORY } from './actions';

const initialState = {
  categoryList: {},
  categoryIsLoaded: false,
  categoryLoadedAt: '',
  showSubCategory: true,
  mainCategory: 0,
  subCategory: 58,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_CATEGORY_LIST:
      return {
        ...state,
        categoryList: data,
        categoryIsLoaded: true,
        categoryLoadedAt: new Date(),
      };
    case SET_MAIN_CATEGORY:
      return {
        ...state,
        mainCategory: data,
        showSubCategory: true,
      };
    case SET_SUB_CATEGORY:
      return {
        ...state,
        subCategory: data,
        showSubCategory: false,
      };
    default:
      return state;
  }
}
