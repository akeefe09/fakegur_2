import { RECEIVE_USER, UPDATE_USER, RECEIVE_USERS } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_POST } from '../actions/post_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_USER:
    case RECEIVE_CURRENT_USER:
    case UPDATE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_POST:
      return merge({}, state, action.user);
    default:
      return state;

  }
};

export default userReducer;
