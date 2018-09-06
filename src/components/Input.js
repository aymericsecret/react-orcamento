import React from 'react';
import PropTypes from 'prop-types';
import idGenerator from 'react-id-generator';
import styled from 'styled-components';


const Input = props => (
  // eslint-disable-next-line jsx-a11y/label-has-for
  <StyledLabel htmlFor={`${props.domain}_${props.id}_${props.idType}`}>
    <span>{props.label}</span>
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
};

Input.defaultProps = {
  selectList: [],
  defaultValue: '',
};
export default Input;

const StyledLabel = styled.label`
  input, textarea {
    height: 25px;
    border: 1px solid rgba(60, 60, 60, 0.5);
    border-radius: 2px;
    transition: border-color .3s ease-out;
    padding-left: 5px;
    color: #3C3C3C;
    font-family: 'Omnes';
    font-size: 14px;
    &:focus {
      border-color: rgba(60, 60, 60, 1);
    }
  }
`;
