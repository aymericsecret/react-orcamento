import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import VisibleLoginForm from './components/VisibleLoginForm';

const Admin = () => (

  <LoginPage>
    <LoginBox>
      <Header />
      <VisibleLoginForm />
    </LoginBox>
  </LoginPage>
);

export default Admin;


const LoginPage = styled.div`
  background: #EDEDED;
  width: 100%;
  height: 100%;
`;
const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 20px;
  height: auto;
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
