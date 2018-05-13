import React from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }


  update(field) {
    return (event) => {
      this.setState({
        [field]: event.currentTarget.value,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  render() {

    return (
      <div className="session">
        <div className="back-to-link">
        </div>

        <div className="sign-in-img">
          <img src={window.logo} />
        </div>

        <div className="background">
        </div>

        <ul className="errors">
          {this.renderErrors()}
        </ul>

        <div className="sign-in-text">Sign In with fakegur</div>

        <div className="login-form">
          <form onSubmit={this.handleSubmit}className="login-form form login">
            <input placeholder="Username" type="text"
              value={this.state.username}
              onChange={this.update('username')} />
            <input placeholder="Password" type="password"
              value={this.state.password}
              onChange={this.update('password')} />
            <button>Sign In</button>

            <div className="login-form toggle">
              <span>
                <Link to='/'>need an account?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
