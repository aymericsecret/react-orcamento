import { INIT_SESSION, STOP_SESSION } from './actions';

const initialState = {
  login: '',
  permission: 0,
  isLoggedIn: false,
  loggedAt: '',
};


export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case INIT_SESSION: {
      return {
        ...state,
        login: data.login,
        isLoggedIn: true,
        loggedAt: new Date(),
        permission: 1,
      };
    }
    case STOP_SESSION: {
      return {
        ...state,
        login: initialState.login,
        isLoggedIn: initialState.isLoggedIn,
        loggedAt: initialState.loggedAt,
        permission: initialState.permission,
      };
    }
    default:
      return state;
  }
}
