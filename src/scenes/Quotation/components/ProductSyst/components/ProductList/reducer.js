import { GET_PRODUCTS } from './actions';

const initialState = {
  products: [],
  productsLoaded: false,
  productsLoadedAt: '',
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: data,
        productsLoaded: true,
        productsLoadedAt: new Date(),
      };
    default:
      return state;
  }
}
