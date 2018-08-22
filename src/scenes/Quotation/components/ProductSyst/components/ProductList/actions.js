export const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts(id) {
  return (dispatch) => {
    console.log(`fetch getProduct ! id : ${id}`);
    console.log(`liens : http://cremme.com.br/wp-json/wp/v2/posts?categories=${id}&per_page=50`);
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
