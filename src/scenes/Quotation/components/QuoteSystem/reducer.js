// import idGenerator from 'react-id-generator';
import {
  INIT_QUOTATION,
  RESET_QUOTATION,
  ADD_PRODUCT_TO_QUOTATION,
  REMOVE_PRODUCT_TO_QUOTATION,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  UPDATE_PRODUCT_NOTE,
  UPDATE_PRODUCT_SIZE,
  UPDATE_PRODUCT_MATERIAL,
  UPDATE_PRODUCT_SIZE_X,
  UPDATE_PRODUCT_SIZE_Y,
  UPDATE_PRODUCTS,
} from './actions';

const initialState = {
  quotation: {
    id: null,
    total_id: 0,
    products: [],
  },
};

const initialQuoteProduct = {
  id_product: null,
  quantity: null,
  price: null,
  note: '',
  material: null,
  size: null,
  size_x: null,
  size_y: null,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_QUOTATION: {
      return {
        ...state,
        quotation: data,
      };
    }
    case RESET_QUOTATION: {
      return {
        ...state,
        quotation: {
          ...state.quotation,
          total_id: 0,
          products: [],
        },
      };
    }
    case ADD_PRODUCT_TO_QUOTATION: {
      const nextID = state.quotation.total_id + 1;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          total_id: nextID,
          products: [
            ...state.quotation.products,
            {
              ...initialQuoteProduct,
              id: nextID,
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
    case UPDATE_PRODUCT_MATERIAL: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].material = data.material;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    case UPDATE_PRODUCT_SIZE_X: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].size_x = data.size_x;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    case UPDATE_PRODUCT_SIZE_Y: {
      const productToUpdate = state.quotation.products.find(el => el.id === data.id);
      const productIndex = state.quotation.products.indexOf(productToUpdate);
      const productListUpdated = state.quotation.products;

      productListUpdated[productIndex].size_y = data.size_y;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: productListUpdated,
        },
      };
    }
    case UPDATE_PRODUCTS: {
      return {
        ...state,
        quotation: {
          ...state.quotation,
        },
      };
    }
    default:
      return state;
  }
}
