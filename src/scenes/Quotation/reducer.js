import {
  INIT_APP, INIT_APP_CATEGORIES, INIT_APP_PRODUCTS_TMP, SET_APP_PRODUCTS_TMP, SET_APP_PRODUCTS,
} from './actions';

const initialState = {
  categories: {},
  products: [],
  productsTmp: [],
  appLoaded: false,
  appCategoriesLoaded: false,
  appProductsLoaded: false,
  appLoadedAt: '',
};


export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_APP: {
      return {
        ...state,
        appLoadedAt: new Date(),
        appLoaded: false,
      };
    }
    case INIT_APP_CATEGORIES: {
      return {
        ...state,
        categories: data,
        appCategoriesLoaded: true,
      };
    }
    case INIT_APP_PRODUCTS_TMP: {
      return {
        ...state,
        productsTmp: [],
      };
    }
    case SET_APP_PRODUCTS_TMP: {
      const productList = state.productsTmp.concat(data);
      return {
        ...state,
        productsTmp: productList,
      };
    }
    case SET_APP_PRODUCTS: {
      return {
        ...state,
        products: state.productsTmp,
        productsTmp: [],
        appProductsLoaded: true,
        appLoaded: true,
      };
    }
    default:
      return state;
  }
}
