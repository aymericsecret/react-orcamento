export const INIT_QUOTATION = 'INIT_QUOTATION';
export const ADD_PRODUCT_TO_QUOTATION = 'ADD_PRODUCT_TO_QUOTATION';
export const REMOVE_PRODUCT_TO_QUOTATION = 'REMOVE_PRODUCT_TO_QUOTATION';

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
