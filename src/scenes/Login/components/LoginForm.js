import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from './components/Input';

class LoginForm extends Component {
  state = {
    login: '',
    password: '',
    message: '',
  }

  componentDidMount = () => {
    const { session } = this.props;

    if (session.isLoggedIn) {
      this.setState({
        message: 'You are already logged in.',
      });
    }
    // const oneHour = 60 * 60 * 1000;
    // console.log(new Date() - new Date(session.loggedAt));
    // if (!session.isLogged || new Date() - new Date(session.loggedAt) > oneHour) {
    //   initApp();
    // }
  }

  login = (e) => {
    console.log(this.props.session);
    if (e.type === 'click' || (e.type === 'keypress' && e.which === 13)) {
      if (this.state.login === 'admin_cremme' && this.state.password === 'test') {
        this.props.initSession({ login: this.state.login });
      } else {
        this.setState({
          message: 'Wrong login or password.',
        });
      }
    }
  }

  updateLogin = (e) => {
    this.setState({
      login: e.target.value,
    });
  }

  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.session.isLoggedIn ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          <div>
            {this.state.message !== '' && (
              <FormMessage>
                <span>{this.state.message}</span>
              </FormMessage>
            )}
            <InputWrapper>
              <Input id="id" label="Login" type="text" value={this.state.login} updateValue={this.updateLogin} login={this.login} />
              <Input id="pass" label="Password" type="password" value={this.state.password} updateValue={this.updatePassword} login={this.login} />
              <StyledButton type="submit" onClick={this.login}>Log In</StyledButton>
            </InputWrapper>
          </div>
        )}
      </div>

    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  session: PropTypes.shape({
    login: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    loggedAt: PropTypes.any.isRequired,
  }).isRequired,
  initSession: PropTypes.func.isRequired,
};

const FormMessage = styled.div`
  padding: 0 20px;
  color: #f62222;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
`;

const StyledButton = styled.button`
    height: 25px;
    padding: 0 20px;
    background: #3c3c3c;
    border: none;
    font-family: 'OmnesMedium';
    font-size: 14px;
    line-height: 25px;
    color: #EDEDED;
    cursor: pointer;
`;
