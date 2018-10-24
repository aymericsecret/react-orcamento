import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from '../../../../utils/config';

const Input = props => (
  <StyledLabel htmlFor={`login_${props.id}`}>
    <span>{props.label}</span>
    <input
      id={`login_${props.id}`}
      type={props.type}
      value={props.value}
      onChange={e => props.updateValue(e)}
      onKeyPress={props.login}
    />
  </StyledLabel>
);

export default Input;

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  span {
    display: block;
    width: 100px;
    font-family: ${config.fonts.medium};
    font-size: 16px;
  }
  input {
    width: calc(100% - 80px);
    height: 25px;
    font-family: ${config.fonts.regular};
    font-size: 14px;
    
  }
  input::placeholder {
    color: ${config.fontColor} !important;
  }
  input::-webkit-input-placeholder {
    color: ${config.fontColor} !important;
  }
  input::-moz-placeholder {
    color: ${config.fontColor} !important;
  }
  input:-ms-input-placeholder {
    color: ${config.fontColor} !important;
  }
  input:-moz-placeholder {
    color: ${config.fontColor} !important;
  }
`;
