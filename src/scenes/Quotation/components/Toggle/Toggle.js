import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { iconToggle } from '../../../../assets/grab.svg';


const Toggle = props => (

  <StyledButton
    type="button"
    onClick={() => props.toggle()}
  >Change
  </StyledButton>
);

export default Toggle;

Toggle.propTypes = {
  toggle: PropTypes.func.isRequired,
};

const StyledButton = styled.button`
  display: block;
  position: fixed;
  top: 10px;
  z-index: 100;
  right: 20px;
  @media only screen and (min-width: 576px) {
    display: none;
  }
`;
