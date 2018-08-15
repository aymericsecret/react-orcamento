import { GET_PRODUCTS } from './actions';
// import { GET_PRODUCTS, GET_PRODUCT, RESET_PRODUCT } from './actions';

const initialState = {
  products: [],
  productsLoaded: false,
  productsLoadedAt: '',
  // product: {
  //   title: {},
  // },
  // productLoaded: false,
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
    // case GET_PRODUCT:
    //   return {
    //     ...state,
    //     product: data,
    //     productLoaded: true,
    //   };
    // case RESET_PRODUCT:
    //   console.log(data);

    //   return {
    //     ...state,
    //     product: initialState.product,
    //     productLoaded: false,
    //   };
    default:
      return state;
  }
}
