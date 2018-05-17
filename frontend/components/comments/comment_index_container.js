import CommentIndex from './comment_index';
import { connect } from 'react-redux';
import { requestAllComments } from '../../actions/comment_actions';

const mapStateToProps = (state) => {
  return ({
    comments: Object.values(state.entities.comments),
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllComments: (id) => dispatch(requestAllComments(id)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);
