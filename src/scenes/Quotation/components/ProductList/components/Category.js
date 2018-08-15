import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ name, id }) => (
  <div data-id={id}>
    <h4>
      {name !== undefined && name}
    </h4>
  </div>
);

export default Category;

Category.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
};

Category.defaultProps = {
  name: undefined,
};
