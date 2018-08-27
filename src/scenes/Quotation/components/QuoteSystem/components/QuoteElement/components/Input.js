import React from 'react';
import PropTypes from 'prop-types';
import idGenerator from 'react-id-generator';


const Input = props => (
  // eslint-disable-next-line jsx-a11y/label-has-for
  <label htmlFor={`product_${props.id}_${props.idType}`}>
    <span>{props.label}</span>
    {props.type === 'input' && (
      <input type="number" id={`product_${props.id}_${props.idType}`} data-type={props.idType} key={`product_${props.id}_${props.idType}`} value={props.value} onChange={props.updateValue} onBlur={props.updateValue} />
    )}
    {props.type === 'textarea' && (
      <textarea id={`product_${props.id}_${props.idType}`} data-type={props.idType} key={`product_${props.id}_${props.idType}`} value={props.value} onChange={props.updateValue} onBlur={props.updateValue} />
    )}
    {props.type === 'select' && (
      <select id={`product_${props.id}_${props.idType}`} data-type={props.idType} key={`product_${props.id}_${props.idType}`} onChange={props.updateValue} value={props.value.toLowerCase()}>
        {props.selectList.map(material => (
          <option value={material} key={`product_${props.id}_material_${idGenerator()}`}>{material}</option>
        ))}
      </select>
    )}
  </label>
);

Input.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  idType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  selectList: PropTypes.arrayOf(PropTypes.string),
  updateValue: PropTypes.func.isRequired,
};

Input.defaultProps = {
  selectList: [],
};
export default Input;
