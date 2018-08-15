import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ name, product, id }) => (
  <div data-id={id}>
    <h4>
      {product !== undefined && product.title.rendered}
      {name !== undefined && name}
    </h4>
    <p>{product !== undefined && product.content.rendered}</p>
  </div>
);

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.object.isRequired,
    content: PropTypes.object,
  }),
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
};

Product.defaultProps = {
  product: undefined,
  name: undefined,
};
