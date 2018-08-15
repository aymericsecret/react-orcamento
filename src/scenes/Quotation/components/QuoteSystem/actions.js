export const INIT_QUOTATION = 'INIT_QUOTATION';
export const ADD_PRODUCT_TO_QUOTATION = 'ADD_PRODUCT_TO_QUOTATION';
export const REMOVE_PRODUCT_TO_QUOTATION = 'REMOVE_PRODUCT_TO_QUOTATION';
export const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';
export const UPDATE_PRODUCT_PRICE = 'UPDATE_PRODUCT_PRICE';
export const UPDATE_PRODUCT_NOTE = 'UPDATE_PRODUCT_NOTE';
export const UPDATE_PRODUCT_SIZE = 'UPDATE_PRODUCT_SIZE';

export function initQuotation(quotation) {
  return (dispatch) => {
    console.log(quotation);
    return dispatch({
      type: 'INIT_QUOTATION',
      data: quotation,
    });
  };
}

export function addProductToQuotation(product) {
  return dispatch => dispatch({
    type: 'ADD_PRODUCT_TO_QUOTATION',
    data: product,
  });
}

export function removeProductFromQuotation(id) {
  return dispatch => dispatch({
    type: 'REMOVE_PRODUCT_TO_QUOTATION',
    data: id,
  });
}

export function updateProductQuantity(quantity) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_QUANTITY',
    data: quantity,
  });
}

export function updateProductPrice(price) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_PRICE',
    data: price,
  });
}

export function updateProductNote(note) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_NOTE',
    data: note,
  });
}

export function updateProductSize(size) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_SIZE',
    data: size,
  });
}
