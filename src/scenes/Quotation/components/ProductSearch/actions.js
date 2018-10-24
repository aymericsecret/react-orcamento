export const INIT_SEARCH = 'INIT_SEARCH';
export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
export const UPDATE_SEARCH_RESULT = 'UPDATE_SEARCH_RESULT';
export const UPDATE_SEARCH_TOGGLE = 'UPDATE_SEARCH_TOGGLE';

export function initSearch() {
  return dispatch => dispatch({
    type: 'INIT_SEARCH',
  });
}

export function updateSearchTerm(searchTerm) {
  return dispatch => dispatch({
    type: 'UPDATE_SEARCH_TERM',
    data: searchTerm,
  });
}

export function updateSearchResult(searchResult) {
  return dispatch => dispatch({
    type: 'UPDATE_SEARCH_RESULT',
    data: searchResult,
  });
}

export function searchToggle(isToggle) {
  return dispatch => dispatch({
    type: 'UPDATE_SEARCH_TOGGLE',
    data: isToggle,
  });
}
