import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import config from '../utils/config';

const { logo } = config;

const LoadingScreen = () => (
  <LoadingWrapper>
    <img src={logo} className="App-logo" alt="logo" />
    <div>Loading content</div>
    <ReactLoading type="bubbles" color={config.fontColor} height={40} width={40} />
  </LoadingWrapper>
);

export default LoadingScreen;

// LoadingScreen.propTypes = {
//   toggleSide: PropTypes.func.isRequired,
// };

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  div {
    font-family: ${config.fonts.medium};
  }
  img {
    margin-bottom: 20px;
    max-width: 150px;
  }
`;
