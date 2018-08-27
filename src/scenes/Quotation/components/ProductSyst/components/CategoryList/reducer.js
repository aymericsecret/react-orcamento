import {
  SET_MAIN_CATEGORY,
  SET_SUB_CATEGORY,
} from './actions';

const initialState = {
  showSubCategory: false,
  mainCategory: 0,
  subCategory: 58,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_MAIN_CATEGORY:
      return {
        ...state,
        mainCategory: data,
        showSubCategory: false,
      };
    case SET_SUB_CATEGORY:
      return {
        ...state,
        subCategory: data,
        showSubCategory: true,
      };
    default:
      return state;
  }
}
