import {
  INIT_QUOTE_REQUEST,
  SAVE_QUOTE_REQUEST,
  SET_DEFAULT_REQUEST_MESSAGE,
} from './actions';

const initialState = {
  request: {
    name: '',
    email: '',
    list_emails: [],
    phone: '',
    occupation: '',
    occupation_outros: '',
    type: '',
    type_outros: '',
    deadline: '',
    architect: '',
    cep: '',
    message: '',
    defaultMessage: '',
  },
  isCreated: false,
};

// const defaultMessage = 'Je suis un content par défaut';

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_QUOTE_REQUEST: {
      return {
        ...state,
        request: state.request,
        isCreated: true,
      };
    }
    case SET_DEFAULT_REQUEST_MESSAGE: {
      return {
        ...state,
        request: {
          ...state.request,
          defaultMessage: data,
        },
      };
    }
    case SAVE_QUOTE_REQUEST: {
      return {
        ...state,
        request: data,
      };
    }
    default:
      return state;
  }
}
