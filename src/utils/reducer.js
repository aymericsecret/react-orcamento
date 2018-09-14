import {
  INIT_APP_NOTES,
} from './actions';

const initialState = {
  tabNotas: [],
};


export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_APP_NOTES: {
      return {
        ...state,
        tabNotas: data,
      };
    }
    default:
      return state;
  }
}
