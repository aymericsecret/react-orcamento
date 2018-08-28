import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import logo from '../../assets/logo_cremme_grey.svg';
import VisibleLoginForm from './components/VisibleLoginForm';

const Admin = props => (

  <LoginPage>
    <LoginBox>
      <StyledLink to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </StyledLink>

      <VisibleLoginForm isLogout={props.isLogout} />
    </LoginBox>
  </LoginPage>
);

export default Admin;

Admin.propTypes = {
  isLogout: PropTypes.bool,
};

Admin.defaultProps = {
  isLogout: false,
};

const LoginPage = styled.div`
  background: #EDEDED;
  width: 100%;
  height: 100%;
`;
const StyledLink = styled(Link)`
  padding: 20px;
  display: block;
`;
const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 20px;
  height: auto !important;
  background: #FFFFFF;
  .App-header {
    width: 100%;
    a {
      img {
        display: block;
        margin: auto;
      }
    }
  }
`;
