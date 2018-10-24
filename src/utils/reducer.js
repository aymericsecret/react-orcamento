import {
  INIT_APP_OPTIONS,
} from './actions';

const initialState = {
  options: {},
};


export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_APP_OPTIONS: {
      return {
        ...state,
        options: data,
      };
    }
    default:
      return state;
  }
}
