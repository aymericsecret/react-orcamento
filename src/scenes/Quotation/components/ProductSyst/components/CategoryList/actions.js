export const SET_MAIN_CATEGORY = 'SET_MAIN_CATEGORY';
export const SET_SUB_CATEGORY = 'SET_SUB_CATEGORY';

export function setMainCategory(index) {
  return (dispatch) => {
    console.log(`Set index main category : ${index}`);
    return dispatch({
      type: 'SET_MAIN_CATEGORY',
      data: index,
    });
  };
}

export function setSubCategory(index) {
  return (dispatch) => {
    console.log(`Set index sub category : ${index}`);
    return dispatch({
      type: 'SET_SUB_CATEGORY',
      data: index,
    });
  };
}
