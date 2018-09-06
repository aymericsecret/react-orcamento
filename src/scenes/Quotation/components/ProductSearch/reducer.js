import {
  INIT_SEARCH,
  UPDATE_SEARCH_TERM,
  UPDATE_SEARCH_RESULT,
  UPDATE_SEARCH_TOGGLE,
} from './actions';

const initialState = {
  searchInit: false,
  searchTerm: '',
  searchResult: [],
  searchToggle: false,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_SEARCH:
      return {
        ...state,
        searchInit: true,
        searchToggle: false,
        searchTerm: '',
        searchResult: [],
      };
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: data,
      };
    case UPDATE_SEARCH_RESULT:
      return {
        ...state,
        searchResult: data,
      };
    case UPDATE_SEARCH_TOGGLE:
      return {
        ...state,
        searchToggle: data,
      };
    default:
      return state;
  }
}
