import {
  INIT_QUOTATION, ADD_PRODUCT_TO_QUOTATION, REMOVE_PRODUCT_TO_QUOTATION,
} from './actions';

const initialState = {
  quotation: {
    id: null,
    products: [],
  },
};

const initialQuoteProduct = {
  id_product: null,
  quantity: null,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_QUOTATION:
      console.log(data);
      return {
        ...state,
        quotation: data,
      };
    case ADD_PRODUCT_TO_QUOTATION:
      console.log(data);

      return {
        ...state,
        quotation: {
          id: state.quotation.id,
          products: [
            ...state.quotation.products,
            {
              ...initialQuoteProduct,
              id_product: data.id,
            },
          ],
        },
      };
    case REMOVE_PRODUCT_TO_QUOTATION: {
      const productToRemove = state.quotation.products.find(el => el.id_product === data);
      const productIndex = state.quotation.products.indexOf(productToRemove);

      // console.log(productToRemove.id_product);
      state.quotation.products.splice(productIndex, 1);
      // console.log(state.quotation.products);

      return {
        ...state,
        quotation: {
          id: state.quotation.id,
          products: [
            ...state.quotation.products,
          ],
        },
      };
    }
    default:
      return state;
  }
}
