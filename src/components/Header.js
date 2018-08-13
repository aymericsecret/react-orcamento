import React from 'react';
import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo_cremme_grey.svg';

const Header = () => (
  <HeaderBox className="App-header">
    <Link to="/">
      <img src={logo} className="App-logo" alt="logo" />
    </Link>
    <Link to="/login">
      <h6>Admin</h6>
    </Link>
  </HeaderBox>
);


export default Header;

const HeaderBox = styled.header`
    height: 40px;
    width: 50%;
    padding: 20px;
`;
