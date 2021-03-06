import * as VoteUtil from '../util/vote_api_util';
import { receivePost } from './post_actions';
// import receiveComment from './comment_actions';

// export const RECEIVE_POST = 'RECEIVE_POST';
// export const RECEIVE_ALL_POSTS = 'RECEIVE_All_POSTS';
export const RECEIVE_VOTE_ERRORS = 'RECEIVE_VOTE_ERRORS';
// export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
// export const DELETE_POST = 'DELETE_POST';
// export const RECEIVE_VOTE = 'RECEIVE_VOTE';

// const removeVote = vote => ({
//     type: RECEIVE_USER,
//     vote,
// });

export const receiveVoteErrors = errors => ({
  type: RECEIVE_VOTE_ERRORS,
  errors,
});

export const createVote = vote => dispatch => {
  return VoteUtil.createVote(vote).then(voted => {
    return dispatch(receivePost(voted));
  });
};
