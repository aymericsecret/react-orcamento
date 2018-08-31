export const INIT_QUOTATION = 'INIT_QUOTATION';
export const RESET_QUOTATION = 'RESET_QUOTATION';
export const ADD_PRODUCT_TO_QUOTATION = 'ADD_PRODUCT_TO_QUOTATION';
export const REMOVE_PRODUCT_TO_QUOTATION = 'REMOVE_PRODUCT_TO_QUOTATION';
export const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';
export const UPDATE_PRODUCT_PRICE = 'UPDATE_PRODUCT_PRICE';
export const UPDATE_PRODUCT_NOTE = 'UPDATE_PRODUCT_NOTE';
export const UPDATE_PRODUCT_SIZE = 'UPDATE_PRODUCT_SIZE';
export const UPDATE_PRODUCT_MATERIAL = 'UPDATE_PRODUCT_MATERIAL';
export const UPDATE_PRODUCT_SIZE_X = 'UPDATE_PRODUCT_SIZE_X';
export const UPDATE_PRODUCT_SIZE_Y = 'UPDATE_PRODUCT_SIZE_Y';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

export function initQuotation(quotation) {
  return dispatch => dispatch({
    type: 'INIT_QUOTATION',
    data: quotation,
  });
}

export function resetQuotation() {
  return dispatch => dispatch({
    type: 'RESET_QUOTATION',
  });
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

export function updateProductMaterial(material) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_MATERIAL',
    data: material,
  });
}

export function updateProductSizeX(material) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_SIZE_X',
    data: material,
  });
}

export function updateProductSizeY(material) {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCT_SIZE_Y',
    data: material,
  });
}

export function updateProductsOrder() {
  return dispatch => dispatch({
    type: 'UPDATE_PRODUCTS',
  });
}
