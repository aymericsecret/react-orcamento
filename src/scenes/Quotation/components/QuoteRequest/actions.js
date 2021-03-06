export const INIT_QUOTE_REQUEST = 'INIT_QUOTE_REQUEST';
export const SAVE_QUOTE_REQUEST = 'SAVE_QUOTE_REQUEST';
export const SET_DEFAULT_REQUEST_MESSAGE = 'SET_DEFAULT_REQUEST_MESSAGE';

export function saveQuoteRequest(quoteRequest) {
  return dispatch => dispatch({
    type: 'SAVE_QUOTE_REQUEST',
    data: quoteRequest,
  });
}

export function setQuoteRequestDefaultMessage(message) {
  return dispatch => dispatch({
    type: 'SET_DEFAULT_REQUEST_MESSAGE',
    data: message,
  });
}

export function initQuoteRequest() {
  return (dispatch) => {
    setQuoteRequestDefaultMessage(dispatch);
    dispatch({
      type: 'INIT_QUOTE_REQUEST',
    });
  };
}
