// Logic Imports
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Action Imports
import { submitLogin } from '../redux/actions';
// CSS Import
import './css/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    passwordInput: '',
    buttonDisabled: true,
  };

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
      buttonDisabled: this.inputChecker(),
    });
  };

  inputChecker = () => {
    const { email, passwordInput } = this.state;
    const PASSWORD_MIN = 5;
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email);
    const passwordCheck = passwordInput.length + 1 > PASSWORD_MIN;
    return !(regexEmail && passwordCheck);
  };

  submitLogInfo = () => {
    const { sendLoginRequest, history } = this.props;
    const { email } = this.state;
    sendLoginRequest(email);
    history.push('/carteira');
  };

  render() {
    const { email, passwordInput, buttonDisabled } = this.state;
    return (
      <div className="login-content">
        <div className="logo-div">
          <img src="https://i.imgur.com/NKyU2kr.png" alt="logo" className="logo" />
          TrybeWallet
        </div>
        <div className="login-tab">
          <p className="label login">
            Login
          </p>
          <div className="field">
            <div className="control">
              <input
                data-testid="email-input"
                className="input"
                type="email"
                placeholder="email"
                name="email"
                onChange={ this.handleInput }
                value={ email }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                data-testid="password-input"
                className="input"
                type="password"
                placeholder="password"
                name="passwordInput"
                onChange={ this.handleInput }
                value={ passwordInput }
              />
            </div>
          </div>
          <p className="control">
            <button
              type="button"
              className="button is-warning is-rounded"
              onClick={ this.submitLogInfo }
              disabled={ buttonDisabled }
            >
              Entrar
            </button>
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLoginRequest: (value) => {
    dispatch(submitLogin(value));
  },
});

Login.propTypes = {
  sendLoginRequest: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
