export const GET_PRODUCTS = 'GET_PRODUCTS';
// export const GET_PRODUCT = 'GET_PRODUCT';
// export const RESET_PRODUCT = 'RESET_PRODUCT';

export function getProducts(id) {
  return (dispatch) => {
    console.log(`fetch getProduct ! id : ${id}`);
    console.log(`liens : http://cremme.com.br/wp-json/wp/v2/posts?categories=${id}`);
    fetch(`http://cremme.com.br/wp-json/wp/v2/posts?categories=${id}`)
      .then(res => res.json())
      .then((products) => {
        console.log(products);
        return dispatch({
          type: 'GET_PRODUCTS',
          data: products,
        });
      });
  };
}

// export function getCategory(id) {

// }
// export function getProduct(id) {
//   return dispatch => dispatch({
//     type: 'GET_PRODUCT',
//     data: id,
//   });
// }
// export function getProduct(id) {
//   return (dispatch) => {
//     fetch(`http://cremme.com.br/wp-json/wp/v2/posts/${id}`)
//       .then(res => res.json())
//       .then((product) => {
//         console.log(product);
//         return dispatch({
//           type: 'GET_PRODUCT',
//           data: product,
//         });
//       });
//   };
// }

// export function resetProduct() {
//   return {
//     type: 'RESET_PRODUCT',
//   };
// }
