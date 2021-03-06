import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const logoutUser = () => {
  return ({
    type: LOGOUT_USER,
  });
};

export const removeErrors = () => {
  return ({
    type: REMOVE_ERRORS
  });
};

export const receiveCurrentUser = ( user ) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    user,
  });
};

export const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
  });
};

export const login = (user) => dispatch => {
  return APIUtil.login(user).then(user => {
    dispatch(receiveCurrentUser(user));
  }, errors => {
    dispatch(receiveErrors(errors.responseJSON));
  });
};

export const logout = () => dispatch => {
  return APIUtil.logout().then(() => {
    return dispatch(logoutUser());
  });
};

export const signup = (user) => dispatch => {
  return APIUtil.signup(user).then(user => {
    return dispatch(receiveCurrentUser(user));
  }, errors => {
    dispatch(receiveErrors(errors.responseJSON));
  });
};
