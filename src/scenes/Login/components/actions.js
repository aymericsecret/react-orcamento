export const INIT_SESSION = 'INIT_SESSION';
export const STOP_SESSION = 'STOP_SESSION';

export function initSession(session) {
  console.log(session);

  return dispatch => dispatch({
    type: 'INIT_SESSION',
    data: session,
  });
}

export function stopSession() {
  return dispatch => dispatch({
    type: 'STOP_SESSION',
  });
}
