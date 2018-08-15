import idGenerator from 'react-id-generator';
import {
  INIT_QUOTATION,
  ADD_PRODUCT_TO_QUOTATION,
  REMOVE_PRODUCT_TO_QUOTATION,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  UPDATE_PRODUCT_NOTE,
  UPDATE_PRODUCT_SIZE,
} from './actions';

const initialState = {
  quotation: {
    id: null,
    products: [],
  },
};

const initialQuoteProduct = {
  id_product: null,
  quantity: 1,
  price: null,
  note: '',
  material: null,
  size: null,
  size_x: 0,
  size_y: 0,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_QUOTATION: {
      console.log(data);
      return {
        ...state,
        quotation: data,
      };
    }
    case ADD_PRODUCT_TO_QUOTATION: {
      console.log(data);

      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: [
            ...state.quotation.products,
            {
              ...initialQuoteProduct,
              id: idGenerator(),
              id_product: data.id,
            },
          ],
        },
      };
    }
    case REMOVE_PRODUCT_TO_QUOTATION: {
      const productToRemove = state.quotation.products.find(el => el.id === data);
      const productIndex = state.quotation.products.indexOf(productToRemove);
      state.quotation.products.splice(productIndex, 1);

      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: [
            ...state.quotation.products,
          ],
        },
      };
    }
    case UPDATE_PRODUCT_QUANTITY: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].quantity = data.quantity;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    case UPDATE_PRODUCT_PRICE: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].price = data.price;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    case UPDATE_PRODUCT_NOTE: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].note = data.note;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    case UPDATE_PRODUCT_SIZE: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].size = data.size;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    default:
      return state;
  }
}
