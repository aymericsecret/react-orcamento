export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
// export const GET_PRODUCT = 'GET_PRODUCT';
// export const RESET_PRODUCT = 'RESET_PRODUCT';

export function getCategoryList() {
  return (dispatch) => {
    fetch('http://cremme.com.br/wp-json/orcamento/v1/categories')
      .then(res => res.json())
      .then((categoryList) => {
        console.log(`categoryList dans actoions.js : ${categoryList}`);
        return dispatch({
          type: 'GET_CATEGORY_LIST',
          data: categoryList,
        });
      });
  };
}

export const SET_MAIN_CATEGORY = 'SET_MAIN_CATEGORY';

export function setMainCategory(index) {
  return (dispatch) => {
    console.log(`Set index main category : ${index}`);
    return dispatch({
      type: 'SET_MAIN_CATEGORY',
      data: index,
    });
  };
}

export const SET_SUB_CATEGORY = 'SET_SUB_CATEGORY';

export function setSubCategory(index) {
  return (dispatch) => {
    console.log(`Set index sub category : ${index}`);
    return dispatch({
      type: 'SET_SUB_CATEGORY',
      data: index,
    });
  };
}
