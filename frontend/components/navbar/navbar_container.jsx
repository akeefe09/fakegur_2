import React from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar';
import { login, signup, logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: user => dispatch(logout(user)),
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    openModal: modal => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
