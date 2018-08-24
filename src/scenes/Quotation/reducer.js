import { INIT_APP, INIT_APP_CATEGORIES, INIT_APP_PRODUCTS } from './actions';

const initialState = {
  categories: {},
  products: [],
  appLoaded: false,
  appLoadedAt: '',
};


export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_APP: {
      return {
        ...state,
        appLoaded: true,
        appLoadedAt: new Date(),
      };
    }
    case INIT_APP_CATEGORIES: {
      return {
        ...state,
        categories: data,
      };
    }
    case INIT_APP_PRODUCTS: {
      const productList = state.products.concat(data);
      return {
        ...state,
        products: productList,
      };
    }
    default:
      return state;
  }
}
