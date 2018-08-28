import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from './components/Input';

// const user = {
//   login: 'a',
//   password: 'a',
// };
const user = {
  login: 'admin_cremme',
  password: 'test',
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.hadSession = props.session.isLoggedIn;
  }

  state = {
    login: 'a',
    password: 'a',
    message: '',
    isLogged: false,
  }

  componentDidMount = () => {
    const { session, isLogout, stopSession } = this.props;

    if (isLogout) {
      stopSession();
      this.setState({
        message: 'You have been logged out.',
      });
    } else if (session.isLoggedIn) {
      this.setState({
        message: 'You are already logged in.',
        isLogged: true,
      });
    }
  }

  login = (e) => {
    if (e.type === 'click' || (e.type === 'keypress' && e.which === 13)) {
      if (this.state.login === user.login && this.state.password === user.password) {
        this.props.initSession({ login: this.state.login });
        this.setState({
          isLogged: true,
        });
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
        {/* Case 1 : accessing logout page but not logged in (no session), Go to login */}
        {this.props.isLogout && !this.hadSession && (
          <Redirect to={{ pathname: '/login' }} />
        )}
        {/* Case 2 : accessing login and logged in sucessfully, or arrived at login when already logged in */}
        {this.state.isLogged ? (
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
  stopSession: PropTypes.func.isRequired,
  isLogout: PropTypes.bool,
};
LoginForm.defaultProps = {
  isLogout: false,
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
