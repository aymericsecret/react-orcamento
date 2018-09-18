import { getOptions } from '../../utils/actions';

export const INIT_APP = 'INIT_APP';
export const INIT_APP_CATEGORIES = 'INIT_APP_CATEGORIES';
export const RESET_APP_PRODUCTS = 'RESET_APP_PRODUCTS';
export const INIT_APP_PRODUCTS_TMP = 'INIT_APP_PRODUCTS_TMP';
export const SET_APP_PRODUCTS_TMP = 'SET_APP_PRODUCTS_TMP';
export const SET_APP_PRODUCTS = 'SET_APP_PRODUCTS';


const productsPerPage = 25;
let productsTotal = null;

export function getCategories(dispatch) {
  return fetch('http://cremme.com.br/wp-json/orcamento/v1/categories')
    .then(res => res.json())
    .then((categoryList) => {
      dispatch({
        type: 'INIT_APP_CATEGORIES',
        data: categoryList,
      });
      dispatch({
        type: 'INIT_APP_PRODUCTS_TMP',
      });
      return categoryList.term_id;
    });
}

export function getProducts(dispatch, idCategory, page) {
  return fetch(`http://cremme.com.br/wp-json/wp/v2/posts?categories=${idCategory}&per_page=${productsPerPage}&page=${page}`)
    .then((res) => {
      if (productsTotal === null) {
        // Getting page number from WP API Headers
        productsTotal = parseInt(new Headers(res.headers).get('X-WP-TotalPages'), 10);
      }
      return res.json();
    })
    .then((products) => {
      dispatch({
        type: 'SET_APP_PRODUCTS_TMP',
        data: products,
      });
      // If there are more pages of products
      if (page < productsTotal) {
        return getProducts(dispatch, idCategory, page + 1);
      }

      dispatch({
        type: 'SET_APP_PRODUCTS',
      });

      return products;
    })
    .catch(error => console.error('Error:', error));
}

export function initApp() {
  return (dispatch) => {
    dispatch({
      type: 'INIT_APP',
    });
    return getCategories(dispatch)
      .then(catID => getProducts(dispatch, catID, 1))
      .then(() => getOptions(dispatch));
  };
}
