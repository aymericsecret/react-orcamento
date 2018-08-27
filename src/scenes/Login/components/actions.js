export const INIT_SESSION = 'INIT_SESSION';

export function initSession(session) {
  console.log(session);

  return dispatch => dispatch({
    type: 'INIT_SESSION',
    data: session,
  });
}
