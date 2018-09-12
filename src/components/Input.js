import React from 'react';
import PropTypes from 'prop-types';
import idGenerator from 'react-id-generator';
import styled from 'styled-components';


const Input = props => (
  // eslint-disable-next-line jsx-a11y/label-has-for
  <StyledLabel htmlFor={`${props.domain}_${props.id}_${props.idType}`}>
    {props.labelFirst && (
      <span>{props.label}</span>
    )}
    {props.type === 'email' && (
      <input type="email" id={`${props.domain}_${props.id}_${props.idType}`} data-type={props.idType} key={`${props.domain}_${props.id}_${props.idType}`} value={props.value} onChange={props.updateValue} onBlur={props.updateValue} />
    )}
    {props.type === 'text' && (
      <input type="text" id={`${props.domain}_${props.id}_${props.idType}`} data-type={props.idType} key={`${props.domain}_${props.id}_${props.idType}`} value={props.value} onChange={props.updateValue} onBlur={props.updateValue} />
    )}
    {props.type === 'input' && (
      <input type="number" id={`${props.domain}_${props.id}_${props.idType}`} data-type={props.idType} key={`${props.domain}_${props.id}_${props.idType}`} value={props.value} onChange={props.updateValue} onBlur={props.updateValue} />
    )}
    {props.type === 'textarea' && (
      <textarea id={`${props.domain}_${props.id}_${props.idType}`} data-type={props.idType} key={`${props.domain}_${props.id}_${props.idType}`} value={props.value} onChange={props.updateValue} onBlur={props.updateValue}>
        {props.defaultValue}
      </textarea>
    )}
    {props.type === 'select' && (
      <select id={`${props.domain}_${props.id}_${props.idType}`} data-type={props.idType} key={`${props.domain}_${props.id}_${props.idType}`} onChange={props.updateValue} value={props.value.toLowerCase()}>
        {props.selectList.map(material => (
          <option value={material} key={`${props.domain}_${props.id}_material_${idGenerator()}`}>{material}</option>
        ))}
      </select>
    )}
    {!props.labelFirst && (
    <span>{props.label}</span>
    )}
  </StyledLabel>
);

Input.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  idType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  selectList: PropTypes.arrayOf(PropTypes.string),
  updateValue: PropTypes.func.isRequired,
  labelFirst: PropTypes.bool,
};

Input.defaultProps = {
  selectList: [],
  defaultValue: '',
  labelFirst: false,
};
export default Input;

const StyledLabel = styled.label`
  font-family: 'OmnesLight';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.8px;
  input, textarea, select {
    height: 25px;
    border: none;
    border-radius: 2px;
    padding-left: 5px;
    color: #3C3C3C;

    font-family: 'Omnes';
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.8px;
    &:focus {
      border-color: rgba(60, 60, 60, 1);
    }
  }
`;
